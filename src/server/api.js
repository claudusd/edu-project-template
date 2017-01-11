const express = require('express');
const app = express();
const api = express.Router();
const FindFinder = require('node-find-files');
const config = require('./config.js');

api.get('/', function (req, res) {
	var finder = new FindFinder({
    rootFolder : config.data
	});
	
	var files = [];
	finder.on('match', function(strPath, stat) {
		files.push(strPath);
	}).on('complete', function(){
		if(files.length == 0){
			console.log("Empty");
			return res.sendStatus(204);
		}
		
	}).startSearch();
});


module.exports = api;
