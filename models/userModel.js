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
        required: true,
    },
    encrypted_data: {
        type: Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model("users", userSchema);
