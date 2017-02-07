import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Client from './Client.js';

class List extends Component {
	constructor (props){
		super(props);
		var that = this;
		that.state = { notes:[] };
		this.supprimer = this.supprimer.bind(this);
		this.c = new Client();
		this.c.findAll(function(notes) {
			that.setState({notes: notes});
		});
	}
	
	supprimer(event) {
		console.log(event.target.value);
		let idDel = event.target.value;
		var callback = function() {
			let lesNotes = [];
				this.state.notes.map(function(note) {
					if(note.id != idDel) {
						lesNotes.push(note);
					}
				})
			this.setState({notes: lesNotes});	
		}
		callback = callback.bind(this);
		this.c.remove(event.target.value, callback);
		
	}

	render(){
	if(this.state.notes.length > 0) {
		
	var each = function(note) {
				return(
				<div key={note.id}>				
				<h3>{note.title}</h3>
				<p>{note.content}</p>
				<Link to={'/'+note.id}>Un lien</Link>
				<button value={note.id} onClick={this.supprimer}>Supprimer</button>
				<hr/>
				</div>);
			};
			each = each.bind(this);
		return (<div>
			{this.state.notes.map(each)}
			</div>
		);
	}
	else {
		return(<div><p>Pas de notes</p></div>);
	}
	}
};

export default List;
