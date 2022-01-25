var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passphrase: {
    type: String,
  },
  encrypted_data: {
    type: String,
    default: "",
  },
  secret_key: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("users", userSchema);
