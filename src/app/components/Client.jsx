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

    create() {

    }

    remove() {

    }
};

const clientInstance = new Client();
export default clientInstance;