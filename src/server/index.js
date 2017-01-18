const express = require('express');
const api = require('./api.js'); // C'est le routeur
const config = require('./config.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/notes', api);

// config.port pour récupérer automatiquement le numéro de port défini dans le fichier de config config.js
app.listen(config.port, function () {
  console.log('Example app listening on port 3000 !');
});






