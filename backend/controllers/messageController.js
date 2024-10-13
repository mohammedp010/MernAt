const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const CryptoJS = require("crypto-js");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  // Encrypt the message content
  const secretKey = process.env.CRYPT_KEY;
  const encryptedContent = CryptoJS.AES.encrypt(content, secretKey).toString();

  var newMessage = {
    sender: req.user._id,
    content: encryptedContent,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
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
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    // Decrypt each message content
    const secretKey = process.env.CRYPT_KEY;
    const decryptedMessages = messages.map((message) => {
      const bytes = CryptoJS.AES.decrypt(message.content, secretKey);
      const originalContent = bytes.toString(CryptoJS.enc.Utf8);
      return {
        ...message._doc,
        content: originalContent,
      };
    });

    res.json(decryptedMessages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
