import React, { Component, PropTypes } from 'react';
import Client from './Client';
import {browserHistory} from 'react-router';
const Timestamp = require('react-timestamp');

export default class OneNote extends Component {
    componentDidMount() {
        const c = new Client();
        c.find(this.setNote, this.props.params.id);
    }

    setNote(json) {
        this.setState({note: json});
    }

    constructor(props) {
        super(props);
        this.state = {
            note: []
        };
        this.setNote = this.setNote.bind(this);
        this.redirectAfter = this.redirectAfter.bind(this);

    }

    removeNote(id) {
        const c = new Client();
        c.remove(id, this.redirectAfter);
    }

    redirectAfter() {
        browserHistory.push('/');
    }

    render() {
        return(
                <div className="col-md-6 col-md-offset-3">
                
                    <div className="hero-widget well well-sm text-center">
                
                        <div className="text">
                            <var>{this.state.note.title}</var>
                            <hr className="colorgraph"/>
                            <div className="row">
                                <label>{this.state.note.contenu}</label>
                            </div>
                            <div className="row">
                                <Timestamp time={this.state.date} format='date'/>
                            </div>
                            <div className="row">
                                <a href="/"><button className="btn btn-primary" >Back</button></a>
                                <button className="btn btn-danger" onClick={() => this.removeNote(this.state.note.id)}>Delete</button>                       
                            </div>
                        </div>
                    </div>
                
                </div>

                );
    }
};