const express = require('express');
const api = require('./api.js');
const config = require('./config.js');

const app = express();

app.listen(config.port, function () {
  console.log('Example app listening on port ' + config.port);
});

app.use('/notes', api);
