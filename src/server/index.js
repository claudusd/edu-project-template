const express = require('express');
const api = require('./api.js');
const config = require('./config.js');

const app= express();


app.use("/notes",api);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(config.port, function () {
  console.log('Example app listening on port 3000!');
});


