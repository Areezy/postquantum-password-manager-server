let User = require("../models/userModel");
let bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const generateAccessToken = require("../helpers/authenticationHelpers");

exports.createUser = async (req, res) => {
  const { username, password, passphrase } = req.body;
  let newUserModel;
  try {
    const salt = await bcrypt.genSalt(10);

    let newUser = {
      username,
      password,
      passphrase,
    };

    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser.passphrase = await bcrypt.hash(newUser.passphrase, salt);

    newUserModel = User(newUser);

    const doc = await newUserModel.save();
    console.log(doc);
    res.status(200).send({ saved: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ saved: false });
  }
};

exports.getUser = async (req, res) => {
  let username = req.body.username;

  try {
    let user = await User.findOne({ username: username });
    res.status(200).json(user);
  } catch (error) {
    console.log(message);
    res.status(401).send("Could not Find User");
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(401).send("Invalid");
    } else {
      bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
          const token = generateAccessToken(user);
          res.status(200).json({
            _id: user._id,
            username: user.username,
            token: token,
          });
        } else {
          res.status(401).send("Invalid");
        }
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.verifyPassphrase = async (req, res) => {
  // console.log(req.user);
  const { _id } = req.user;
  const { passphrase } = req.body;

  try {
    const user = await User.findOne({ _id: _id });
    console.log(user);
    bcrypt.compare(passphrase, user.passphrase, function (error, result) {
      if (result) {
        res.status(200).send("valid");
      } else {
        res.status(401).send("Invalid");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getEncryptedData = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findOne({ _id: _id });

    res.status(200).json({ data: user.encrypted_data });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};

exports.updateEncryptedData = async (req, res) => {
  const { _id } = req.user;
  const { data } = req.body;

  try {
    const user = await User.findOne({ _id: _id });

    user.encrypted_data = data;

    await user.save();

    res.status(200).send("updated");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
};
