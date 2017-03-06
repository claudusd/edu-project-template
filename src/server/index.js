const express = require('express');
const api = require('./api.js');
const config = require('./config.js');
const bodyParser = require('body-parser');

const app= express();

app.use(bodyParser.json());
app.use("/notes",api);
app.use( express.static(config.static));
app.use(function(req,res,next){
	res.sendFile('index.html',{
		root: config.static
	});
});

app.listen(config.port, function () {
  console.log('Example app listening on port 3000!');
});
