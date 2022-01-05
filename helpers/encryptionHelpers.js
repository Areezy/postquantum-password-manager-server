var CryptoJS = require("crypto-js");

const encryptKey = (data, key) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

const decryptKey = (data, key) => {
  const bytes = CryptoJS.AES.decrypt(data, key);
  const originalData = bytes.toString(CryptoJS.enc.Utf8);
  return Buffer.from(JSON.parse(originalData).data);
};

module.exports = {
  encryptKey,
  decryptKey,
};
