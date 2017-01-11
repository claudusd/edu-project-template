const express = require('express');
const router = express.Router();
const FindFiles = require('node-find-files');
const config = require('./config.js');

router.get('/', function(req, res){
	
	const finder = new FindFiles({
		rootFolder : config.data
	});

	const files = [];

	finder.on('match', function(path, stat){
		files.push(path);
	}).on('complete', function() {
		if(files.length == 0){
			return res.sendStatus(204);
		}

		for (var file in files) {
			res.sendFile(file);
		}
	});

	finder.startSearch();
});

router.get('/:id', function(req, res){
	res.send(req.params);
});

router.delete('/:id', function(req, res){
	res.send(req.params);
});

router.post('/', function(req, res){
	res.send(req.params);
});

module.exports = router;