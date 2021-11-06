//const bcrypt = require("bcrypt");
//require("../env").config();
//const jwt = require("jsonwebtoken");
//const User = require("../Models/user");


//api/sample/getCookie
const getCookie = (req, res) => {
    const authCookie = "eyJhbGciOiJIUzI1NiJ9.YXBwbGU.Xa-Fhq7udiBqBJfT1plAArftLMx0eIgkASHJbyMnXHM";
    res.cookie('auth-token', authCookie, {httpOnly:true, maxAge: 24*3600*1000});
    res.cookie('jwt-secret', "some secret", {httpOnly:true, maxAge: 24*3600*1000});
    res.status(200);
    res.json({message:"send cookies, check in the response"});
}

//api/sample/getreq
const getreq = async (req, res) => {
    res.status(200);
    res.json({"received your cookie(auth-token) to validate the user":req.user});
};

//api/sample/postreq
const postreq = (req, res) => {
    res.status(200);
    res.json({"received your header(auth-token) to validate the user":req.user});
   
}

//api/sample/putreq
const putreq = async (req, res) => {
	res.status(200);
    res.json({"your body contains json data":{name:req.body.name, age:req.body.age}});
};

//api/sample/deletereq/:id
const deletereq = (req, res) => {
	res.status(200);
    res.json({"your url contains the param":req.params.id});
}

//api/sample/getQuery/
const getQuery = (req, res)=>{
    res.status(200);
    console.log(req.body);
    res.json({"your url contains the query string":req.query});
}


module.exports = { getCookie, getreq, postreq, deletereq, putreq, getQuery };