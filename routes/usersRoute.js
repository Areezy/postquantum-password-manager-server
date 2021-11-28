var express = require("express");
var router = express.Router();
var userController = require('../controllers/userController');

/* GET create users. */

router.post("/create", userController.createUser);
router.get("/", userController.getUser);


module.exports = router;
