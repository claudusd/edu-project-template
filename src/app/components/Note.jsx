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
			<h3>{this.state.note.title}</h3>
			<p>{this.state.note.content}</p>
			<p>{this.state.note.date}</p>
			<button onClick={this.supprimer}>Supprimer</button>
			</div>
			);
		} else {
			return(
				<div>
					<p>Pas de notes pour cet id</p>
				</div>
			);
		}
		
	}
};

export default Note;
