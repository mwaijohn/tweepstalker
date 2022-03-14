const express = require("express");
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const port = 3000

const cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.json())

var apiRouter = require('../routes/router.api');

app.use(`/api`, apiRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

