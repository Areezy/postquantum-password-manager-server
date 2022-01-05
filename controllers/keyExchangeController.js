let bcrypt = require("bcrypt");
const { KeyEncapsulation, Signature } = require("liboqs-node");

exports.performKEM = async (req, res) => {
  const KEMAlgorithm = new KeyEncapsulation("Kyber512");
  const signatureAlgorithm = new Signature("Dilithium2");

  const { cipherText, signature, secret, signaturePublicKey } = req.body;

  const cipherTextBuffer = Buffer.from(JSON.parse(cipherText).data);
  const signaturePublicKeyBuffer = Buffer.from(
    JSON.parse(signaturePublicKey).data
  );
  const signatureBuffer = Buffer.from(JSON.parse(signature).data);
  const secretBuffer = Buffer.from(JSON.parse(secret).data);

  const isValid = signatureAlgorithm.verify(
    cipherTextBuffer,
    signatureBuffer,
    signaturePublicKeyBuffer
  );

  if (isValid) {
    const secretKey = KEMAlgorithm.decapsulateSecret(cipherTextBuffer);

    if (Buffer.compare(secretKey, secretBuffer) === 0) {
      console.log("same key was generated");
    }

    //TODO: Encrypt and Save to Database.
    res.status(200).send(secretKey);
  } else {
    res.status(401).send("Invalid Digital Signature!");
  }
};
