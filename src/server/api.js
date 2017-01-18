const express = require('express');
const app = express();
const api = express.Router();
const FindFinder = require('node-find-files');
const config = require('./config.js');
const fs = require('fs');
const uuid = require('node-uuid');


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

api.get('/:id', function(req,res){
	var finder = new FindFinder({
    rootFolder : config.data
	});
	var filename = config.data+"/"+req.params.id+".json";
	var files = [];
	finder.on('match', function(strPath, stat) {
		files.push(strPath);
	}).on('complete', function(){
		if(files.name == filename){
			console.log("OK");
			return res.sendStatus(204);
		}
		
	}).startSearch();
});

api.post('/', function (req, res) {
	var note = req.body
	note.id = uuid.v4();
	note.date = Date.now() / 1000;
	fs.writeFile(config.data+'/'+note.id+'.json', JSON.stringify(note),function (err){
		if(err) throw err;
	});
	res.status(201).send(JSON.stringify({id: note.id}));
});

api.delete('/:id', function (req, res){
	var filename = config.data+"/"+req.params.id+".json";
	console.log('try to find:'+filename);
	fs.exists(filename, (exists)=>{
		if(exists){
			fs.unlink(filename);
			res.status(204).send('File deleted\n');
		}else{
			res.status(404).send('File not found\n');
		}
	})	
});

module.exports = api;
