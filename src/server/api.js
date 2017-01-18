const express = require('express');
const app = express();
const api = express.Router();
const FindFinder = require('node-find-files');
const config = require ('./config.js');
const fs = require('fs');
const uuid = require('node-uuid');


api.get('/', function(req, res){

	var finder = new FindFinder({
		rootFolder : config.data
			
	});

	var files = [];
	
	finder.on('match', function(strPath, stat){
		files.push(strPath);	
	}).on('complete', function(){

		if(files.length == 0){
			console.log('No file');
			return res.sendStatus(204);

		}
		
	}).startSearch();
});


api.post('/', function(req, res){
	
		var note = req.body;
		note.date = Date.now()/1000;
		note.id = uuid.v4();
		
		fs.writeFile(config.data+"/"+note.id+".json", JSON.stringify(note), function (err) {
			
			if (err) {
				return console.log(err);
			}
			
		});
		
	console.log("Object JSON sauvegardé");
	res.status(201).send(JSON.stringify({id: note.id}));
	
});




module.exports = api;
