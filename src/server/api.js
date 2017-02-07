const express = require('express');
const router = express.Router();
const FindFiles = require('node-find-files');
const config = require('./config.js');
const fs = require('fs');
const uuid = require('node-uuid');

router.get('/', function(req, res){
	
	const finder = new FindFiles({
		rootFolder : config.data,
		filterFunction: function(path, stat){
			return path.endsWith(".json");
		}
	});

	const filesPath = [];
	finder.on("match", function(path, stat){
		filesPath.push(path);
	})
	.on("complete", function() {
		if(filesPath.length == 0){
			return res.sendStatus(204);
		}
		
		notes = [];
		for (file of filesPath) {
			notes.push(JSON.parse(fs.readFileSync(file)));
		}
		
		res.status(200).send(notes);
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
	note = {
		id: uuid.v4(),
		date: Math.floor(Date.now() / 1000),
		title: req.body.title,
		content: req.body.content
	};
	fs.writeFile(config.data + '/' + note.id + '.json', JSON.stringify(note), (err) => {
		if (err) throw err;
		console.log('Your note is saved!');
	}); 
	res.status(201).json({"id": note.id });
});

module.exports = router;
