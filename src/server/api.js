// Routeur et exporter
const express = require('express');
const router = express.Router();
const config = require('./config.js');
const FindFinder = require('node-find-files');

router.get('/', function (req, res) {
				//pour recupérer les notes qu'il y a dans le dossier data
  	var finder = new FindFinder({
		rootFolder: config.data
	});
	var files = [];
	finder.on("match", function(strPath, stat) {
		files.push(strPath);
	}).on("complete", function() {
		if(files.length==0) {
			return res.sendStatus(204);		
		}
	}).startSearch();
})

router.post('/', function (req, res) {
  res.send('Got a POST request')
})

router.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

router.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

module.exports = router
