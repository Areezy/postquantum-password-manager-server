const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.SECRET);
};

module.exports = generateAccessToken;
