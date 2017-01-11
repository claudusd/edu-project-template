const express = require('express');
const api = express.Router();

const findFiles = require("node-find-files");
const config = require('./config.js');

api.route('/')
	.get(function(req, res) {
		var files = [];
		var finder = new findFiles({
		    rootFolder : config.data
		});

		finder.on('match', function(strPath, stat) {
		    console.log(strPath + " - " + stat.mtime);
			files.push(strPath);
		}).on('complete', function() {
			if(files.length == 0) return res.status(204).send('No files');

	    	return res.status(200).send(files);
		});

		finder.startSearch();
  	})
	.post(function(req, res) {
    	res.status(201).send('Post /');
  	})

api.route('/:id')
	.get(function(req, res) {
		res.send(req.params.id);
	})
	.delete(function(req, res) {
		
	})

module.exports = api;