const express = require('express');
const api = require('./api.js');
const config = require('./config.js');

const app = express();

app.use('/notes', api);

app.listen(config.port, function () {
  console.log('This server run on localhost:'+config.port);
});