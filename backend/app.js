const express = require("express");
// const serverless = require("serverless-http");
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const app = express();
app.use(cors()) 
app.use(bodyParser.json())

var apiRouter = require('./routes/router.api');

app.use(`/api`, apiRouter);

app.listen(3001, () => {
    console.log(`Example app listening on port ${3001}`)
  })


// module.exports = app;
// module.exports.handler = serverless(app);