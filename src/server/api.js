const express = require('express');
const api = express.Router();
const config = require('./config.js');
const findFiles = require("node-find-files");
const uuid = require('node-uuid');
const fs = require('fs');


api.get('/', function(request, response){

	const finder = new findFiles({
    		rootFolder : config.data,
    		filterFunction : function (path, stat) {
				return true;
			}
	});

	var files = [];

	finder.on("match", function(path, stat) {
   		files.push(path);
		console.log("le fichier " + path + " a bien été ajouté"); 
	});

	finder.on("complete", function() {
		if(files.length == 0){
			return response.sendStatus(204);
		}else {			
			for(var file of files){
				console.log(file);

				fs.readFile(file,  (err, data) => {
					if (err) throw err;
						console.log(JSON.parse(data));						
				});
			}	
		}
    		console.log("les fichiers ont bien étés ajoutés");
	});

	finder.startSearch();
});

api.get('/:id', function(request,response){
	
	var path = config.data + "/" + request.params.id + ".json";
	
	console.log(path);
	
	fs.exists(path, (exists) =>{
		if (exists){
			return response.sendStatus(200);
		} else{
			return response.sendStatus(204);
		}
	});	
});

api.delete('/:id', function(request,response){
	
	var path = config.data + "/" + request.params.id + ".json";
	
	fs.exists(path, (exists) =>{
		if (exists){
			fs.unlink(path);
			return response.sendStatus(200);
		} else{
			return response.sendStatus(204);
		}
	});	
});


api.post("/", function(request, response){
	var json = {};
	json["id"] = uuid.v4();
	json["title"] = request.body.title
	json["content"] = request.body.content;
	json["date"] = '"' + Date.now() / 1000 + '"';
	path = config.data + "/" + json["id"] + ".json";
	
	fs.writeFile(path,JSON.stringify(json),(err) => {
		if (err) throw err;
			console.log('It\'s saved!');
	});
});

module.exports = api;
