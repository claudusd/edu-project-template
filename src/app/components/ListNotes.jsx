import React, { Component } from 'react';
import client from './client.js';
import { Link} from 'react-router';

class ListNotes extends Component {
	constructor(props){
		super(props);
		this.state = {notes: []};
		var that = this;
		client.findAll(function(notes){
			console.log(notes);
			that.setState({notes: notes});	
		});
	}

	render(){
		const notes = this.state.notes;
		console.log(notes);
		return (
			<div>
				<h1>List of notes:</h1>
				<ul>
				{notes.map(function(note, i) {
					return <li key={i}><Link to={"/note/"+note.id} >{note.title}</Link></li>
				})}
				</ul>
			</div>
		)	
		
	}
   
};

export default ListNotes;


