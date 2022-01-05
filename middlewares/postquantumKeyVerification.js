let User = require("../models/userModel");
const { decryptKey } = require("../helpers/encryptionHelpers");

const verifyPQKEY = async (req, res, next) => {
  const key = req.headers.key;
  const { _id } = req.user;

  if (key) {
    let keyBuffer = Buffer.from(JSON.parse(key).data);
    try {
      const user = await User.findOne({ _id: _id });
      const userKey = decryptKey(user.secret_key, process.env.KEY_ENCRYPT_KEY);
      if (Buffer.compare(userKey, keyBuffer) === 0) {
        next();
      } else {
        return res.status(401).send("Unauthorized");
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = verifyPQKEY;
