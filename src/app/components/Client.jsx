import React, { Component, PropTypes } from 'react';

class Client {
    findAll(callback) {
        fetch('/notes')
            .then((response) => response.json())
            .then((responseJson) => callback(responseJson))
            .catch((error) => {
                console.error(error);
            }
        );
    }

    find(id, callback) {
        fetch('/notes/' + id)
            .then((response) => response.json())
            .then((responseJson) => callback(responseJson))
            .catch((error) => {
                console.error(error);
            }
        );
    }

    create(title, content, callback) {
    	fetch('/notes', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    title: title,
		    content: content,
		  })
		})
	        .then((response) => response.json())
	        .then((responseJson) => callback(responseJson))
	        .catch((error) => {
	            console.error(error);
	        }
        );
    	//post
    	//content response JSON 
    }

    remove(id, callback) {
    	fetch('/notes/' + id, {
		  method: 'DELETE',
		  headers: {
		    'Accept': 'application/json',
		  },
		})
            .then((response) => callback(response))
            .catch((error) => {
                console.error(error);
            }
        );
    }
};

const clientInstance = new Client();
export default clientInstance;