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
            <div className="container left-align">
            <h3 className="">Add a note</h3>
            <p>Here you can add a Note to your list.</p>

            <form onSubmit={this.handleSubmit}>   
            <label>
            Title:
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required/>
            </label>
            <label>
            Content:
            <input type="text" name="content" value={this.state.content} onChange={this.handleChange} required/>
            </label>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
            </button>
            </form>
            </div>
            );
    }
};
