const express = require('express');
const {fetchUserCookies, validateLoginCredentials} = require('../middlewares/validateUser');
const authControllers = require('./auth_controller');
var cookieParser = require('cookie-parser');

const router = express.Router();

//express.urlencoded()
router.use(express.json());
router.use(cookieParser());

router.post("/createuser", validateLoginCredentials, authControllers.createUser);
router.post("/login", validateLoginCredentials, authControllers.authenticate);
router.post("/getuser", fetchUserCookies, authControllers.getUserDetails);
router.post("/logout", fetchUserCookies, authControllers.logoutUser);

module.exports = router;