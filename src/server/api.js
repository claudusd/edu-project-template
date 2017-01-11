const express= require('express');
const routeur = express.Router();
const FindFiles = require("node-find-files");
const config = require('./config.js');

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
			console.log('Aucun fichiers trouvés');
			return response.sendStatus(204);	
		}
	}).startSearch();

});

module.exports= routeur;
