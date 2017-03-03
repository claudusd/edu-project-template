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
				<div className="container">				
				<div className="row-fluid"><div className="col-sm-12">
				<div className="panel panel-default"><div className="panel-body">
				<div className="row-fluid">
				<div key={note.id}>				
				<h3 className="col-sm-offset-2 col-sm-10">{note.title}</h3>
				<p className="col-sm-offset-2 col-sm-10">{note.content}</p>
				<Link className="col-sm-offset-2 col-sm-4 btn btn-primaty" to={'/'+note.id}>Consulter la note</Link>
				<button className="col-sm-2 btn btn-danger" value={note.id} onClick={this.supprimer}>Supprimer</button>
				
				</div></div></div></div></div></div></div>);
			};
			each = each.bind(this);
		return (<div>
			<div className="jumbotron text-center">
			<h1>Welcome to Note Manager</h1>
			<Link className="btn btn-primaty" to={'/new'}>Cliquer ici pour ajouter une note !</Link>
			</div>
			<div className="row-fluid">
			<div>{this.state.notes.map(each)}
			</div></div></div>
		);
	}
	else {
		return(<div>
			<div className="jumbotron text-center">
			<h1>Welcome to Note Manager</h1>
			<Link className="btn btn-primaty" to={'/new'}>Cliquer ici pour ajouter une note !</Link>
			</div>
	<div className="row-fluid"><h2 className="text-center">Pas de notes</h2></div></div>);
	}
	}
};

export default List;
