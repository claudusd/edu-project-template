const express = require('express');
const api = express.Router();

const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const findFiles = require('node-find-files');
const config = require('./config.js');

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.route('/')
.get(function(req, res) {
	var allContent = [];
	var files = [];
	var finder = new findFiles({
		rootFolder : config.data,
		filterFunction: function () {
			return true;
		}
	});

	finder.on('match', function(strPath, stat) {
		    //console.log(strPath + " - " + stat.mtime);
		    files.push(strPath);
		}).on('complete', function() {
			if(files.length == 0) return res.status(204).send('No notes found');
			
			for(file of files) {
				allContent.push(JSON.parse(fs.readFileSync(file)))
			};

			return res.status(200).send(allContent);
		});

		finder.startSearch();
	})
.post(function(req, res) {
	var uniqueId = uuid.v4();

	var content = {};
	content['id'] = uniqueId;
	content['date'] = parseInt(Date.now()/1000);
	content['title'] = req.body.title;
	content['content'] = req.body.content;

	fs.writeFile(config.data + "/" + uniqueId + ".json", JSON.stringify(content), (err) => {
		if (err) throw err;
	});
	return res.status(201).send(JSON.stringify({id: uniqueId})) ;
})

api.route('/:id')
.get(function(req, res) {
	var file = config.data + "/" + req.params.id + ".json";

	fs.exists(file, (exists) => {
		if (exists) {
			return res.status(200).sendFile(file);
		} else {
			return res.status(404).send('Note not found');
		}
	});
})
.delete(function(req, res) {
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