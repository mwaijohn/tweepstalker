const express = require("express");
const serverless = require("serverless-http");

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const app = express();
app.use(cors())

var apiRouter = require('../routes/router.api');

app.use(`/.netlify/functions/api`, apiRouter);


module.exports = app;
module.exports.handler = serverless(app);