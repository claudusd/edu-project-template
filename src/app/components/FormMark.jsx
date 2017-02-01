import React, { Component, PropTypes } from 'react';

import clientInstance from './Client';

export default class FormMark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            content: null,
            info: null,
        };
        
        this.infoAfterCreate = this.infoAfterCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    infoAfterCreate(info) {
        this.setState({
            info: info
        })
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
          [name]: value
        });
    }


    handleSubmit(event) {
        clientInstance.create(this.state.title, this.state.content, this.infoAfterCreate);
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            </label>
            <label>
              Content:
              <input type="text" name="content" value={this.state.content} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
};
