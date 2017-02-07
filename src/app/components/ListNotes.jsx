import React, { Component } from 'react';
import client from './client.js';
import { Link} from 'react-router';

class ListNotes extends Component {
	constructor(props){
		super(props);
		this.state = {notes: []};
		var that = this;
		client.findAll(function(notes){
			console.log("Notes are:"+notes);
			that.setState({notes: notes});	
		});
	}

	render(){
		const notes = this.state.notes;
		return (
			<div className="row">
				<h1 className="text-center" >List of notes:</h1>
				<ul className="text-center">
				{notes.map(function(note, i) {
					return <li key={i} className="col-sm-offset-2 col-sm-8 text-center"><Link to={"/note/"+note.id} >{note.title}</Link></li>
				})}
				</ul>

				<Link to="/create" className="col-sm-12 text-center" >Create a new note</Link>
			</div>
		)	
		
	}
   
};

export default ListNotes;


