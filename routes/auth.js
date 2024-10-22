var express = require("express");
var router = express.Router();
let admin_Controler = require("../controllers/crud_controler/admin");
let user_Controler = require("../controllers/user/user")
let multer = require("../helper/multer.profile");
const bcrypt = require("bcrypt");
const player = require("../model/player");
const User = require("../model/user");



/* GET home page. */

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/admin/signup", admin_Controler.signup);
router.post("/admin/login", admin_Controler.login);



router.post("/user/login",user_Controler.login)
router.post('/user/register',multer.any(),user_Controler.registerUser);




















module.exports = router;
