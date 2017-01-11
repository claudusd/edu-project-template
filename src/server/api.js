const express = require('express');
const api = express.Router();
const config = require('./config.js');
const findFiles = require("node-find-files");

api.get('/', function(request, response){

	const finder = new findFiles({
    		rootFolder : config.data
	});

	var files = [];

	finder.on("match", function(path, stat) {
   		files.push(path);
		console.log("le fichier " + path + "a bien été ajouté"); 
	});

	finder.on("complete", function() {
		if(files.length == 0){
			return response.sendStatus(204);
		}
    		console.log("les fichiers ont bien étés ajoutés");
	});

	finder.startSearch();
});

api.post("/", function(request, response){

});

module.exports = api;
