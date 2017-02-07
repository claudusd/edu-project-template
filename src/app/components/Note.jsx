import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router'
import Client from './Client'
 
export default class Note extends Component {
	
	constructor(props) {
		super(props);
		this.getNote = this.getNote.bind(this)
		this.state = {note : []};
	}
	
	getNote(data){
		this.setState({note : data});
		console.log(this.state.note);
	}
	
	componentDidMount(){
		Client.findById(this.getNote, this.props.params.id); 
	 }
    render() {
		
		let note = this.state.note;
		
				
		let lienSupr = "/" + note.id
		
		return (
			<div className="row">
				<h1>{note.title}</h1>
				<h3>{note.content}</h3>
				<button onClick={this.lienSupr} className="btn btn-danger">Supprimer une note </button>
			</div>
			
		);		
	}		
};
 
