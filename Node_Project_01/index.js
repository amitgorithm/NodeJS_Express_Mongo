const express = require("express");
const fs = require("fs");

const{ logReqRes } = require("./middlewares");
const {connectMongoDb} = require("./connection");
const userRouter = require('./routes/user');


const app = express();
const PORT = 8000;

// connection to mongoDB
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

//Routes
app.use('/user', userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
