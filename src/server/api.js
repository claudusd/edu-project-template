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
		rootFolder: config.data,
		filterFunction : function (path, stat) {
			return path.endsWith('.json');
		    }
	});
	var files = [];
	finder.on('match', function(strPath, stat) {
		files.push(strPath);
	}).on('complete', function() {
console.log(files);
		if(files.length==0) {
			return res.sendStatus(204);		
		}
		else {
			var list = [];
			var i = 0;
			for(i; i < files.length ; i++)
			{
				var obj = JSON.parse(fs.readFileSync(files[i], 'utf8'));
				list.push(obj);
			}
			return res.json(list);
		}
	}).startSearch();
})

router.get('/:idNote', function (req, res) {
	//Récupération du parametre
	var idnote = req.params.idNote;
	var chemin = config.data + "/" + idnote + ".json";
	//Récupérer une note
	fs.exists(chemin, (exists) => {
		if(exists)
		{
			return res.json(JSON.parse(fs.readFileSync(chemin, 'utf8')));
		} else {
			return res.sendStatus(404);
		}
	});
})

// curl --data  "{ 'title': 'title' }" localhost:3000/notes

router.post('/', function (req, res) {
	var note = req.body;
	/*note.title = req.body.title;
	note.content = req.body.content;*/
	note.id = uuid.v4();
	note.date = Math.floor(Date.now() / 1000);
console.log(note);
	fs.writeFile(config.data+'/'+note.id+'.json', JSON.stringify(note), function(err) {
		if (err)
		 	return res.sendStatus(500);
		return res.status(201).json({id : note.id});
	});
})

router.delete('/:idNote', function (req, res) {
	var idnote = req.params.idNote;
	var chemin = config.data + "/" + idnote + ".json";
	//Récupérer une note
	fs.exists(chemin, (exists) => {
	if(exists)
	{
		fs.unlinkSync(chemin);
		return res.sendStatus(204);
	} else {
		return res.sendStatus(404);
	}
});

	
})

router.use('/time', function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next();
})

module.exports = router
