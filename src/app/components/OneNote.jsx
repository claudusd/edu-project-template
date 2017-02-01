import React, { Component, PropTypes } from 'react';
import Client from './Client';

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
        this.setNote = this.setNote.bind(this)
    }


    render(){
        return(
        <div>
                <h1>Note : {this.state.note.title}</h1>
                <h3>{this.state.note.contenu}</h3>
                <h4>{this.state.note.date}</h4>
                <button>Delete</button>
      </div>
        );
    }
};