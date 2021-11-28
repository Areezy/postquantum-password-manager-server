let User = require("../models/userModel");

exports.createUser = async (req, res) => {
    const { username, password, passphrase } = req.body;

    let newUser = {
        username,
        password,
        passphrase,
    };

    let newUserModel = User(newUser);

    try {
        await newUserModel.save();
        res.send({ saved: true });
    } catch ({ message }) {
        console.log(message);
        res.status(401).send({ saved: false });
    }
};

exports.getUser = async (req, res) => {
    let username = req.body.username;

    try {
        let user = await User.findOne({username: username});
        res.status(200).json(user)
    } catch (error) {
        console.log(message);
        res.status(401).send("Could not Find User");
    }
};
