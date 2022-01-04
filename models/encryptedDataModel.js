var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var encryptedDataSchema = new Schema({
    data: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model("encrypted_data", encryptedDataSchema);
