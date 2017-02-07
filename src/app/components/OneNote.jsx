import React, { Component, PropTypes } from 'react';
import Client from './Client';
import {browserHistory} from 'react-router';

export default class OneNote extends Component {
    componentDidMount() {
        const c = new Client();
        c.find(this.setNote, this.props.params.id);
    }
    ;
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
                                <label>{this.state.note.contenu}</label>
                                <br/>
                                <label>{this.state.note.date}</label>
                                <br/>
                                <button className="btn btn-danger" onClick={() => this.removeNote(this.state.note.id)}>Delete</button>
                            </div>
                            <div className="options">
                            </div>
                        </div>
                    </div>
 
                );
    }
};