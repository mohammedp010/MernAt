const crypto = require("crypto");


const algorithm = 'aes-256-cbc';

const key = "mohammed-sft-dev-full-stack-mern"

const iv = crypto.randomBytes(16);
const dec = (data) => {
            let msgData = Buffer.from(data.iv, 'base64')
            const decipher = crypto.createDecipheriv(algorithm, key, msgData);
            let decryptedData = decipher.update(data.content, "hex", "utf-8");
            decryptedData += decipher.final("utf-8");
            data.content = decryptedData;

            return data.content;
}

module.exports = dec;