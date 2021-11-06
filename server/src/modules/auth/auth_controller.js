const bcrypt = require("bcryptjs");
const {findUser, addUser} = require("../db/index");
const jwt = require("jsonwebtoken");

const createJWT = (data)=>{
    return jwt.sign(data, process.env.JWT_SECRET);
}

const encryptPasword = async (password)=>{
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return(hashPassword);
}

//users/createuser
const createUser = async (req, res) => {

    const userName = req.body.username;
    const passwordHash = await encryptPasword(req.body.password);
    try{
        const user = addUser(userName, passwordHash);
        const token = createJWT(user);
        res.cookie('auth', token, {httpOnly:true, maxAge: 24*3600*1000});
        res.status(200);
        res.json({userName, token});
    }catch(error){
        res.return(400).json({error});
    }
    
}

//users/login
const authenticate = async (req, res) => {
	const userName = req.body.username;
    const passwordHash = await encryptPasword(req.body.password);
    try{
        const user = findUser(userName, passwordHash);
        const token = createJWT(user);
        res.cookie('auth', token, {httpOnly:true, maxAge: 24*3600*1000});
        res.status(200);
        res.json({userName, token});
    }catch(error){
        res.return(400).json({error});
    }
}

//users/logout
const logoutUser = async (req, res) => {
    res.cookie('auth', "invalid user", {httpOnly:true, maxAge: 1});
    res.status(200);
    res.json({"statue" : "logout"});
};

//users/getUser
const getUserDetails = async (req, res) => {
	res.status(200);
    res.json({name:"getuser"});
};


module.exports = { createUser, authenticate, getUserDetails, logoutUser };