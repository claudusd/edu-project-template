import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router'
import Client from './Client';
export default class List extends Component {
    
    componentDidMount(){
        const c = new Client();
        c.findAll(this.setNotes);
    };

    setNotes(json){
      this.setState({notes:json});
    }

    constructor(props){
        super(props);
        this.state = {
          notes: []
        };
        this.setNotes = this.setNotes.bind(this)
    }


    render(){
        return(
        <div>
        <h1>Notes!</h1>
        {this.state.notes.map(function(note) {
          return (
            <div key={note.id} className="note">
              <Link to={'/one/' + note.id} >
                {note.title}
              </Link>
            </div>
          );     
        })}
       <Link to={'/new'}><button>Ajouter une Note</button></Link>
      </div>
        );
    }
};