import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from './routes/index.mjs';
import stubRouter from './routes/stub.mjs';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const mongoDB = "mongodb://mongo:27017/user";
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.use('/api/v0/', stubRouter); //stub
app.use('/api/v1/', indexRouter);

export default app;