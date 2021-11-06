const express = require('express');
const {fetchUserCookies, fetchUserHeader} = require('../middlewares/validateUser');
const sampleControllers = require('./sample_controller');
var cookieParser = require('cookie-parser');

const router = express.Router();


//router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cookieParser());

router.get("/getCookie", sampleControllers.getCookie);
router.get("/getreq", fetchUserCookies, sampleControllers.getreq);
router.post("/postreq", fetchUserHeader, sampleControllers.postreq);
router.put("/putreq", sampleControllers.putreq);
router.delete("/deletereq/:id", fetchUserCookies, sampleControllers.deletereq);
router.get("/query", sampleControllers.getQuery);

module.exports = router;