var express = require("express");
var router = express.Router();
var userController = require('../controllers/userController');
var jwtVerification = require('../middlewares/jwtVerification');
var PQVerification = require('../middlewares/postquantumKeyVerification');


/* GET create users. */

router.get("/", userController.getUser);
router.get("/data", jwtVerification, PQVerification, userController.getEncryptedData);
router.post("/create", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/data", jwtVerification, PQVerification, userController.updateEncryptedData);

router.post('/verify', jwtVerification, PQVerification, userController.verifyPassphrase);


module.exports = router;
