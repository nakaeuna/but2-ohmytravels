const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config()

const indexRouter = require('./routes/index');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // allow requests from this origin
}));

// or allow requests from all origins
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api-docs', (req, res) => {
    res.send("<a href=\"/api/v1/tools/api-docs/\"> tools docs </a> <br/> " +
        "<a href=\"/api/v1/users/api-docs/\"> users docs </a> <br/> " +
        "<a href=\"/api/v1/travels/api-docs/\"> travels docs </a>")
})

app.use('/api/v1/', indexRouter);

module.exports = app;
