const express = require('express');
const config = require('./config.js');
const FindFiles = require("node-find-files");
const api = express.Router();

api.get('/',function(req, res) {
	var files = [];

	var finder = new FindFiles({
	    rootFolder:config.data
	});

	finder.on("match", function(strPath, stat) {
	    files.push(strPath)
	}).on('complete',function(){
		if (files.length ==0) {
	    	return res.status(204).send('No files found\n');
		}
	}).startSearch();
});
/*
api.post('/',function(req, res) {
    res.send('POST request\n');
});

api.put('/',function(req, res) {
    res.send('PUT request\n');
});
*/
 module.exports = api;