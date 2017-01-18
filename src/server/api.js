const express = require('express');
const router = express.Router();
const FindFiles = require('node-find-files');
const config = require('./config.js');
const fs = require('fs');
const uuid = require('node-uuid');

router.get('/', function(req, res){
	
	const finder = new FindFiles({
		rootFolder : config.data,
		filterFunction: function(){
			return true;
		}
	});

	const files = [];
	
	finder.on("match", function(path, stat){
		files.push(path);
	}).on("complete", function() {
		if(files.length == 0){
			return res.sendStatus(204);
		}
		
		json_array = [];
		for (file of files) {
			json_array.push(JSON.parse(fs.readFileSync(file)));
		}
		
		res.status(200).send(json_array);
	});

	finder.startSearch();
});

router.get('/:id', function(req, res){
	const file = config.data + '/' + req.params.id + '.json';
	fs.exists(file, (exists) => {
		if(exists){
			res.status(200).sendFile(file);
		} else{
			res.sendStatus(404);
		}
	});
});

router.delete('/:id', function(req, res){
	const file = config.data + '/' + req.params.id + '.json';
	fs.exists(file, (exists) => {
		if(exists){
			fs.unlink(file);
			res.sendStatus(204);
		} else{
			res.sendStatus(404);
		}
	});
});

router.post('/', function(req, res){
	content = {};
	content["id"] = uuid.v4();
	content["date"] = Date.now() / 1000;
	content["title"] = req.body.title;
	content["content"] = req.body.content;
	fs.writeFile(config.data + '/' + content.id + '.json', JSON.stringify(content), (err) => {
		if (err) throw err;
		console.log('It\'s saved!');
	}); 
	res.status(201).send(content.id);
});

module.exports = router;
