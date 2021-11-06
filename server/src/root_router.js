var express = require('express');
const sampleRouter = require('./modules/sample/sample_route');
const authRouter = require('./modules/auth/auth_route');

const generateRoutes = (app)=>{

    // use express.static middleware to locate static files
    //app.use('/files', express.static('./files'));
    app.use(express.static('./src/files'));
    app.use('/api/users', authRouter);
    app.use('/api/sample', sampleRouter);

} 

module.exports = generateRoutes;