import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Client from '../Client';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', content: '', submitted: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getId = this.getId.bind(this);
    }

    getId(id) {
        this.setState({submitted: true, id});
    }

    handleSubmit(event) {
        event.preventDefault();
        const client = new Client();
        delete this.state.submitted;
        client.create(this.state, this.getId);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    render() {
        if (!this.state.submitted) {
            return (
                <div className="row-fluid">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Titre : </label><input className="form-control" type="text"
                                                                          value={this.state.title} name="title"
                                                                          id="title" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenu : </label><textarea className="form-control"
                                                                                 value={this.state.content}
                                                                                 name="content" id="content"
                                                                                 onChange={this.handleChange}/>
                        </div>
                        <button className="btn btn-success" type="submit" value="Ajouter"/>
                    </form>
                </div>
            );
        }
        else {
            return (<h2><Link to={'/' + this.state.id}>Note créée</Link></h2>);
        }
    }
};