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
    		rootFolder : config.data,
		filterFunction : function (path, stat) {
        	return (path.includes(".json")) ? true : false;
    }
	});

	var files=[];
	//if there are files
	finder.on("match", function (strPath, stat){
		var fileContent=fs.readFileSync(strPath, 'utf8');
		files.push(JSON.parse(fileContent));

	}).on("complete",function(){
		if(files.length == 0){
			console.log('Aucun fichier trouvé');
			return response.sendStatus(204);
		}
		else{
			return response.status(200).send(files);
		}
	}).startSearch();

});

//get the note by id
routeur.get("/:id",function(request, response){
	var id= request.params.id;
	fs.exists(config.data+"/"+id+".json", function(exist) {
		if(exist){
			fs.readFile(config.data+"/"+id+".json", 'utf8', function(error, data) {
				if (error) {
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
	var id=uuid.v4();
	var date= Math.floor(Date.now()/1000);
	note.id=id;
	note.date=date;

	fs.writeFile(config.data+"/"+id+".json", JSON.stringify(note), function(error) {
		if (error)
			return response.sendStatus(500);
		return response.status(201).json({id: note.id});
	})
})

//delete a note
routeur.delete("/:id", function(request,response){
	var id= request.params.id;
	fs.exists(config.data+"/"+id+".json", function(exist) {
		if(exist){
			fs.unlink(config.data+"/"+id+".json", function(error) {
				if(error) return response.sendStatus(500);
				return response.sendStatus(204);
			})
		} else {
			return response.sendStatus(404);
		}
	});

})

module.exports= routeur;
