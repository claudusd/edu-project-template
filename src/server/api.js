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
	var jsonFile

	finder.on("match", function(path, stat) {
   		files.push(path);
	});

	finder.on("complete", function() {
		var json_array = []
		if(files.length == 0){
			return response.sendStatus(204);
		}else {			
			for(var file of files){
				jsonFile = JSON.parse(fs.readFileSync(file));
				json_array.push(jsonFile);
				console.log(json_array);						
			}	
			return response.status(200).json(json_array);
		}  				
	});
	finder.startSearch();
	
});

api.get('/:id', function(request,response){
	
	var path = config.data + "/" + request.params.id + ".json";
	
	console.log(path);
	
	fs.exists(path, (exists) =>{
		if (exists){
			
			var note = JSON.parse(fs.readFileSync(path));			
			return response.json(note);
			
		} else{
			return response.sendStatus(404);
		}
	});	
});

api.delete('/suprNote/:id', function(request,response){
	
	var path = config.data + "/" + request.params.id + ".json";
	
	fs.exists(path, (exists) =>{
		if (exists){
			fs.unlink(path);
			return response.sendStatus(204);
		} else{
			return response.sendStatus(404);
		}
	});	
});


api.post("/create", function(request, response){
	var json = request.body;
	json.id = uuid.v4();
	json.date = Math.floor(Date.now() / 1000);
	path = config.data + "/" + json.id + ".json";
	
	fs.writeFile(path,JSON.stringify(json),(err) => {
		if (err) throw err;
		return response.status(201).json({id: json.id});
		console.log('It\'s saved!');
	});
});

module.exports = api;
