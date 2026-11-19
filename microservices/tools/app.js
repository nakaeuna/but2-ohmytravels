const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const stubRouter = require('./routes/stub');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v0/', stubRouter); //stub
app.use('/api/v1/', indexRouter);

module.exports = app;
