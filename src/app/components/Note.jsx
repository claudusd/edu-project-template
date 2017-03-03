import React, { Component, PropTypes } from 'react';
import { Link , browserHistory } from 'react-router';

import Client from './Client.js';

class Note extends Component {
	constructor (props){
		super(props);
		var that = this;
		that.state = { note: {} };
		this.supprimer = this.supprimer.bind(this);
		this.c = new Client();
		this.c.find(this.props.params.splat, function(note) {
			
			that.setState({note: note});
		});
	}

	
	supprimer(event) {
		event.preventDefault();
		this.c.remove(this.props.params.splat, function() {
			browserHistory.push('/');
		});
	}

	render(){
		if(this.state.note.title) {
			return (
			<div>
			<div className="jumbotron text-center">
			<h1>Welcome to Note Manager</h1>
			<Link className="btn btn-primaty" to={'/new'}>Cliquer ici pour ajouter une note !</Link>
			</div>
			<div className="text-center">
			<h2>{this.state.note.title}</h2>
			<h3>{this.state.note.content}</h3>
			<p>{this.state.note.date}</p>
			<button className="btn btn-danger" onClick={this.supprimer}>Supprimer</button>
			</div>
			<div className="container text-center">
			<Link className="btn btn-primaty" to={'/'}>Revenir à la liste des notes</Link>
			</div></div>
			);
		} else {
			return(
				<div>
					<div className="jumbotron text-center">
					<h1>Welcome to Note Manager</h1>
					<Link className="btn btn-primaty" to={'/new'}>Cliquer ici pour ajouter une note !</Link>
					</div>
					<h2 className="text-center">Pas de notes pour cet id</h2>
					<div className="container text-center">
					<Link className="btn btn-primaty" to={'/'}>Revenir à la liste des notes</Link>
				</div></div>
			);
		}
		
	}
};

export default Note;
