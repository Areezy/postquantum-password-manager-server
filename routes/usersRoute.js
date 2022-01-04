var express = require("express");
var router = express.Router();
var userController = require('../controllers/userController');
var jwtVerification = require('../middlewares/jwtVerification');

/* GET create users. */

router.get("/", userController.getUser);
router.get("/data", jwtVerification, userController.getEncryptedData);
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/data", jwtVerification, userController.updateEncryptedData);

router.post('/verify', jwtVerification, userController.verifyPassphrase);


module.exports = router;
