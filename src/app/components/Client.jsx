import React, { Component, PropTypes } from 'react';

export default class Client extends Component {
    findAll() {
        return fetch('/notes')
            .then(response => response.json())
            .then((notes) => { this.setState({ notes }); });
    }
};