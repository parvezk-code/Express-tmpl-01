var express = require('express');
var generateRoutes = require('./src/root_router');
const dotenv = require('dotenv');

//setup environment variables
dotenv.config({ path: './.env' });

var app = express();
//fire root controller to generate routes
generateRoutes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: "No such route exists"});
  console.log("invalid url");
});

// error handler
app.use(function (err, req, res, next) {
  
  // if headers have been send then call Express default error handler
  if (res.headersSent) {
    return next(err); // calls Express default error handler
  }

  res.status(500)
  res.render('error', { error: err })
});

app.listen(3000, ()=>{
    console.log("hello", process.env.JWT_SECRET);
})