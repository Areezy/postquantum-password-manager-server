var express = require("express");
var router = express.Router();
var keyExchangeController = require('../controllers/keyExchangeController');
var jwtVerification = require('../middlewares/jwtVerification');

router.post("/", keyExchangeController.performKEM);

module.exports = router;