const express = require("express");
const serverless = require("serverless-http");

const app = express();
var apiRouter = require('../routes/router.api');
app.use(`/.netlify/functions/api`, apiRouter);

module.exports = app;
module.exports.handler = serverless(app);