const express = require('express');
const api = require('./api.js');
const config = require('./config.js');

const app = express();

app.use('/notes', api);
app.use(express.static(config.static));
app.use(function(req,res,next){
	res.sendFile('index.html', {
		root:config.static
	});
});

app.listen(config.port, function () {
 	console.log('App listening on port ' + config.port + '!');
});
