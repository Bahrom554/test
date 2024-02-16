var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require("fs");
const httpsServerOptions = {
    key: fs.readFileSync('./https/accounts.google.com.key'),
    cert: fs.readFileSync('./https/accounts.google.com.crt'),
    requestCert: false,
    rejectUnauthorized: false
};
var app = express();;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test',(req,res, next) => {
    res.json({message:"nigga https server run......"})
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    console.log(data);
    console.log(error.stack);
    res.status(status).json({ message: message, data: data });
});
const server = require('https').Server(httpsServerOptions, app);

server.listen('443', async function () {
    console.log('We are running on port 443');
});
