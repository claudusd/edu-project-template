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
		    filterFunction: function (path, stat) {
                    return path.endsWith('.json');
            }
		});

		finder.on('match', function(strPath, stat) {
			files.push(strPath);
		}).on('complete', function() {
			if(files.length == 0) return res.status(204).send('No notes found');

			for(file of files) {
				let current = JSON.parse(fs.readFileSync(file))
				let date = new Date(current.date * 1000)
				current.date = date.getHours() + ':' + ("0" + date.getMinutes()).substr(-2) + ':' + ("0" + date.getSeconds()).substr(-2)
				allContent.push(current)
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
			let current = JSON.parse(fs.readFileSync(file))
			let date = new Date(current.date * 1000)
			current.date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
			return res.status(200).send(current);
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
