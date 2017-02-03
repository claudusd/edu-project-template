import React, { Component, PropTypes } from 'react';
import Client from './Client';
import {browserHistory} from 'react-router';

export default class OneNote extends Component {
    componentDidMount(){
        const c = new Client();
        c.find(this.setNote, this.props.params.id);
    };

    setNote(json){
      this.setState({note:json});
    }

    constructor(props){
        super(props);
        this.state = {
          note: []
        };
        this.setNote = this.setNote.bind(this);
        this.redirectAfter = this.redirectAfter.bind(this);
    }

    removeNote(id){
    	const c = new Client();
    	c.remove(id, this.redirectAfter);
    }

    redirectAfter(){
    	browserHistory.push('/');
    }


    render(){
        return(
        <div>
                <h1>Note : {this.state.note.title}</h1>
                <h3>{this.state.note.contenu}</h3>
                <h4>{this.state.note.date}</h4>
                <button onClick={()=>this.removeNote(this.state.note.id)}>Delete</button>
      </div>
        );
    }
};