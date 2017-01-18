const express = require('express');
const config = require('./config.js');
const bodyParser = require('body-parser');
const FindFiles = require("node-find-files");
const fs = require("fs");
const uuid = require("node-uuid");
const api = express.Router();

api.use(bodyParser.urlencoded({extended: false}))
api.use(bodyParser.json())
api.get('/',function(req, res) {
	var files = [];

	var finder = new FindFiles({
	    rootFolder:config.data
	});

	finder.on("match", function(strPath, stat) {
	    files.push(strPath)
	}).on('complete',function(){
		if (files.length ==0) {
	    	return res.status(204).send('No files found\n');
		}
	}).startSearch();
});

api.post('/',function(req, res) {
	uniqueId = uuid.v4();
	fs.writeFile(config.data + "/" + uniqueId + ".json",JSON.stringify(req.body),err=>{
		if(err)throw err;
	})
    res.send(201, JSON.stringify({id: uniqueId}));
});

api.delete('/:id',function(req, res) {
	var filename = config.data + "/" + req.params.id + ".json";
	console.log("try to find: " + filename );
	fs.exists(filename, (exists)=>{
		if (exists) {
			fs.unlink(filename);
			res.status(200).send('File deleted\n');
		}else{
			res.status(404).send('File not found\n');
		}
	}) 
    //res.send('PUT request\n');
});

/*
api.get('/:id',function(req, res) {
	var filename = config.data + "/" + req.params.id + ".json";
	fs.exists(filename, (exists)=>{
		if (exists) {
			fs.unlink(filename);
			res.status(204).send('File deleted\n');
		}else{
			res.status(404).send('File not found\n');
		}
	})
});*/

 module.exports = api;