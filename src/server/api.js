const uuid= require('node-uuid');
const express= require('express');
const routeur = express.Router();
const FindFiles = require("node-find-files");
const config = require('./config.js');
const fs= require('fs');

//get all notes
routeur.get("/",function(request, response){
	//list files in /data
	var finder = new FindFiles({
    		rootFolder : config.data
	});
	
	var files=[];
	//if there are files
	finder.on("match", function (strPath, stat){
		files.push(strPath);
	}).on("complete",function(){
		if(files.length == 0){
			console.log('Aucun fichier trouvé');
			return response.sendStatus(204);	
		}
	}).startSearch();

});

//get the note by id
routeur.get("/:id",function(request, response){
	var id= request.params.id;
	fs.exists(config.data+"/"+id+".json", function(exist) {
		if(exist){ 
			fs.readFile(config.data+"/"+id+".json", 'utf8', function(err, data) {
				if (err) {
					return response.sendStatus(500);
				}
				return response.status(200).send(data);
			});
		} else {
			return response.sendStatus(404);
		}
	});	
})


//post a new note
routeur.post("/", function(request,response){
	var note = request.body;
	console.log(note);
	var id=uuid.v4();
	var date= Math.round(Date.now()/1000);
	note.id=id;
	note.date=date;

	fs.writeFile(config.data+"/"+id+".json", JSON.stringify(note), function(err) {
		if (err)
			return response.sendStatus(500);
		return response.status(201).json({id: note.id});
	})
})

//delete a note
routeur.delete("/:id", function(request,response){
	var id= request.params.id;
	fs.exists(config.data+"/"+id+".json", function(exist) {
		if(exist){ 
			fs.unlink(config.data+"/"+id+".json", function(err) {
				if(err) return response.sendStatus(500);
				return response.sendStatus(204);
			})
		} else {
			return response.sendStatus(404);
		}
	});	
	
})

module.exports= routeur;
