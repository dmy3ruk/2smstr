const fs = require("fs");
const crypto = require("crypto");

function encryptFile(filePath, password) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const cipher = crypto.createCipher("aes-256-cbc", password);
  let encrypted = cipher.update(fileContent, "utf8", "hex");
  encrypted += cipher.final("hex");
  fs.writeFileSync(filePath, encrypted, "utf8");
}

function decryptFile(filePath, password) {
  const encryptedContent = fs.readFileSync(filePath, "utf8");
  const decipher = crypto.createDecipher("aes-256-cbc", password);
  let decrypted = decipher.update(encryptedContent, "hex", "utf8");
  decrypted += decipher.final("utf8");
  fs.writeFileSync(filePath, decrypted, "utf8");
}
function encryptAndSaveFile(filePath, password) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const cipher = crypto.createCipher("aes-256-cbc", password);
  let encrypted = cipher.update(fileContent, "utf8", "hex");
  encrypted += cipher.final("hex");
  const newFilePath = `text.enc`;
  fs.writeFileSync(newFilePath, encrypted, "utf8");
}

function decryptAndSaveFile(filePath, password) {
  const encryptedContent = fs.readFileSync(filePath, "utf8");
  const decipher = crypto.createDecipher("aes-256-cbc", password);
  let decrypted = decipher.update(encryptedContent, "hex", "utf8");
  decrypted += decipher.final("utf8");
  const newFilePath = filePath.replace(".enc", ".txt");
  fs.writeFileSync(newFilePath, decrypted, "utf8");
}
encryptAndSaveFile("./text.txt", "4654949898");