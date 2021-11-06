const jwt = require("jsonwebtoken");
//require("../../.env").config({ path: './.env' });


const fetchUserHeader = (req, res, next) => {
  const token = req.header(process.env.AUTH_TOKEN);
  //const token = "eyJhbGciOiJIUzI1NiJ9.YXBwbGU.Xa-Fhq7udiBqBJfT1plAArftLMx0eIgkASHJbyMnXHM";
  if (!token) {
    return res.status(401).send({ error: "authentication by invalid header token " });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

const fetchUserCookies = (req, res, next) => {
  const token = req.cookies["auth-token"];
  if (!token) {
    return res.status(401).send({ error: "authentication by invalid cookie" });
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

const validateLoginCredentials = (req, res, next) => {
  const userName = req.body.username;
  const password = req.body.password;
  if(userName && password){
    next();
  }else{
    return res.status(401).send({ error: "username and password can not be empty" });
  }
}

module.exports = {fetchUserHeader, validateLoginCredentials, fetchUserCookies};
