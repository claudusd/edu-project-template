const express = require('express');
const api = require('./api.js');
const config = require('./config.js');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use("/notes",api);


app.listen(config.port, function () {
	console.log("Vous êtes connecté sur localhost sur le port " + config.port);	
});
