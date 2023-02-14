const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const User = require("../models/userModel");
// const crypto = require("crypto");


// const algorithm = 'aes-256-cbc';

// const key = "mohammed-sft-dev-full-stack-mern"

// const iv = crypto.randomBytes(16);



const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    // const cipher = crypto.createCipheriv(algorithm, key, iv);
    // let encryptedData = cipher.update(content, "utf-8", "hex");
    // encryptedData += cipher.final("hex");

    // const base64data = Buffer.from(iv, 'binary').toString('base64');


    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select: "name pic email",
        });
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}
);

const allMessages = asyncHandler(async (req, res) => {
    try {


        // const obj = await Message(chat: )
        // console.log(messages);
        // console.log("start------------");
        //        await decr();
        //  async function decr(){
        //      const messages = await Message.find({ chat: req.params.chatId })
        //          .populate(
        //              "sender",
        //              "name pic email"
        //          ).populate("chat");
        //     messages.forEach((message) => {
        //         let msg = Buffer.from(message.iv, 'base64')
        //         console.log(msg);
        //         const decipher = crypto.createDecipheriv(algorithm, key, msg);
        //         let decryptedData = decipher.update(message.content, "hex", "utf-8");
        //         decryptedData += decipher.final("utf-8");
        //         message.content = decryptedData

        //     });
        //      res.json(messages);
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);

    }

});

module.exports = { sendMessage, allMessages };