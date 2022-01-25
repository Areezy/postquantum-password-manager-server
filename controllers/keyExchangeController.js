const { KeyEncapsulation, Signature } = require("liboqs-node");
const { encryptKey } = require("../helpers/encryptionHelpers");
let User = require("../models/userModel");
const { performance } = require("perf_hooks");

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

  let startTime = performance.now();

  const isValid = signatureAlgorithm.verify(
    publicKeyBuffer,
    signatureBuffer,
    signaturePublicKeyBuffer
  );

  let endTime = performance.now();

  let elapsed = endTime - startTime;

  console.log("\n");
  console.log("\n");
  console.log("\n");
  console.log("-----------------------------------------------------------");

  console.log(
    `SERVER: Digital Signature verification time is ${elapsed.toFixed(
      2
    )} milliseconds`
  );

  if (isValid) {
    startTime = performance.now();
    const { ciphertext, sharedSecret } =
      KEMAlgorithm.encapsulateSecret(publicKeyBuffer);

    endTime = performance.now();

    elapsed = endTime - startTime;

    console.log(
      `SERVER: Encalpsulated key size is ${Buffer.byteLength(
        sharedSecret
      )} bytes`
    );
    console.log(
      `SERVER: Key Encapsulation took ${elapsed.toFixed(2)} milliseconds`
    );
    console.log("-----------------------------------------------------------");
    console.log("\n");
    console.log("\n");
    console.log("\n");

    try {
      const user = await User.findOne({ _id: _id });

      let encryptedKey = encryptKey(
        JSON.stringify(sharedSecret),
        process.env.KEY_ENCRYPT_KEY
      );

      user.secret_key = encryptedKey;

      await user.save();
      let obj = {
        ciphertext: JSON.stringify(ciphertext),
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
