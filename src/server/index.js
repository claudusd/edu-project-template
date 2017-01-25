const express = require('express');
const api = require('./api.js');
const config = require('./config.js');
const bodyParser = require('body-parser');




var app = express();
var router = express.Router();

app.use(express.static(config.static));
app.use(bodyParser.json());
app.use('/notes', api);

app.listen(config.port, function () {
  console.log('Example app listening on port 3000! o');
});


