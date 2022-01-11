const { KeyEncapsulation, Signature } = require("liboqs-node");
const { encryptKey } = require("../helpers/encryptionHelpers");
let User = require("../models/userModel");

exports.performKEM = async (req, res) => {
  const signatureAlgorithm = new Signature("Dilithium2");
  const KEMAlgorithm = new KeyEncapsulation("Kyber512");

  const { signature, publicKey, signaturePublicKey } = req.body;

  const { _id } = req.user;

  const publicKeyBuffer = Buffer.from(JSON.parse(publicKey).data);

  const signaturePublicKeyBuffer = Buffer.from(
    JSON.parse(signaturePublicKey).data
  );

  const signatureBuffer = Buffer.from(JSON.parse(signature).data);

  const isValid = signatureAlgorithm.verify(
    publicKeyBuffer,
    signatureBuffer,
    signaturePublicKeyBuffer
  );

  if (isValid) {
    const { ciphertext, sharedSecret } =
      KEMAlgorithm.encapsulateSecret(publicKeyBuffer);

    try {
      const user = await User.findOne({ _id: _id });

      let encryptedKey = encryptKey(
        JSON.stringify(sharedSecret),
        process.env.KEY_ENCRYPT_KEY
      );

      user.secret_key = encryptedKey;

      await user.save();
      let obj = {
        ciphertext: JSON.stringify(ciphertext)
      };
      res.status(200).send(obj);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error");
    }
  } else {
    res.status(401).send("Invalid Digital Signature!");
  }
};
