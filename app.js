var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const booksV1 = require("./routes/booksV1");
const authRoute = require("./routes/authRoute");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1/livros/", booksV1);
app.use("/api", authRoute);

module.exports = app;
