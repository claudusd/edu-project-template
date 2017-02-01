const express = require('express');
const app = express();
const api = express.Router();
const FindFinder = require('node-find-files');
const config = require ('./config.js');
const fs = require('fs');
const uuid = require('node-uuid');


api.get('/', function(req, res){

	var finder = new FindFinder({
		rootFolder : config.data,
		filterFunction : function (path, stat) {
        		return  true;
    		}
			
	});

	var files = [];
	var notes = [];
	
	finder.on('match', function(strPath, stat){
		files.push(strPath);	
	}).on('complete', function(){

		if(files.length == 0){
			console.log('No file');
			return res.sendStatus(204);

		}

		for(file of files){
			notes.push(JSON.parse(fs.readFileSync(file)));
		}

		return res.status(200).send(notes);

		
		
		
		
	}).startSearch();
});



api.get('/:id', function(req, res){

	var file = config.data + "/" + req.params.id + ".json";

	fs.exists(file , (exists) => {
		if(exists){
			return res.status(200).sendFile(file);
			
		}
		else{
			return res.status(404).send('File note found');
		}
		
	});

});

api.post('/', function(req, res){
	
		var note = req.body;
		note.date = Math.floor(Date.now()/1000);
		note.id = uuid.v4();
		
		fs.writeFile(config.data+"/"+note.id+".json", JSON.stringify(note), function (err) {
			
			if (err) {
				return console.log(err);
			}
			
		});
		
	console.log("Object JSON sauvegardé");
	res.status(201).send(JSON.stringify({id: note.id}));
	
});

api.delete('/:id', function(req, res) {
		var file = config.data + "/" + req.params.id + ".json";

		fs.exists(file, (exists) => {
			if (exists) {
				fs.unlink(file);
				return res.status(204).send('Note deleted');
			} else {
				return res.status(404).send('Note not found');
			}
		});
	})




module.exports = api;
