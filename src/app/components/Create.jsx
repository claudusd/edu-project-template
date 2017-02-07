import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import Client from '../Client';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', content: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getNote = this.getNote.bind(this);
    }

    getNote(id) {
        browserHistory.push("/" + id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const client = new Client();
        client.create(this.state, this.getNote);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="row-fluid">
            <h3>Créer une note</h3>
            <br/>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Titre : </label>
                        <input className="form-control" type="text"
                            value={this.state.title} name="title"
                            id="title" onChange={this.handleChange}
                            required="required"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Contenu : </label>
                        <textarea className="form-control"
                            value={this.state.content}
                            name="content" id="content"
                            onChange={this.handleChange}
                            required="required"/>
                    </div>
                    <input className="btn btn-success" type="submit" value="Ajouter"/>
                </form>
            </div>
        );
        
    }
};