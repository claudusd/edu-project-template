// Routeur et exporter
const express = require('express');
const router = express.Router();
const config = require('./config.js');
const FindFinder = require('node-find-files');

const uuid = require('node-uuid');
const fs = require('fs');



router.get('/', function (req, res) {
				//pour recupérer les notes qu'il y a dans le dossier data
  	var finder = new FindFinder({
		rootFolder: config.data
	});
	var files = [];
	finder.on('match', function(strPath, stat) {
		files.push(strPath);
	}).on('complete', function() {
		if(files.length==0) {
			return res.sendStatus(204);
			//return res.send('at least i m trying');		
		}
		else {
		
		}
	}).startSearch();
})
// curl --data "title=title" localhost:3000/notes

router.post('/', function (req, res) {
	var note = req.body;

	note.title = req.body.title;
	note.content = req.body.content;
	note.id = uuid.v4();
	note.date = Date.now()/1000;
console.log(note);
	fs.writeFile(config.data+'/'+note.id+'.json', JSON.stringify(note), function() {
		res.sendStatus(500);
	});
	res.status(201).send(JSON.stringify({id : note.id}));
	//retoure objet avec id {"id": }
  	//res.send('Got a POST request');
})

router.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

router.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

router.use('/time', function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})

module.exports = router
