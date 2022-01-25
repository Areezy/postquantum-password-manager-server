const { encryptKey, decryptKey } = require("../helpers/encryptionHelpers");

describe("Encryption and Decryption Behaviour", () => {
  let key = {
    value: "Super secret key",
  };

  let keyBuffer = Buffer.from(JSON.stringify(key));
  let encryptedKey = encryptKey(JSON.stringify(keyBuffer), "123");

  it("Should be able to properly decrypt Encrypted Data and return as a buffer", () => {
    expect(decryptKey(encryptedKey, "123")).toEqual(
      Buffer.from(JSON.stringify(key))
    );
  });
});
