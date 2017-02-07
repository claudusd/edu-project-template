import React, { Component, PropTypes } from 'react';
import { Link, router, browserHistory } from 'react-router';

import Client from './Client.js';

class Form extends Component {
	constructor (props){
		super(props);
		this.state = {};
		this.c = new Client();
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeContent = this.handleChangeContent.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChangeTitle(event) {
		let state = this.state;
		state.title = event.target.value;
		this.setState(state);
	}
	
	handleChangeContent(event) {
		let state = this.state;
		state.content = event.target.value;
		this.setState(state);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		this.c.create({title: this.state.title, content: this.state.content}, function(note) {
			console.log(note.id);
			browserHistory.push('/'+note.id);
		});
	}	

	render(){		
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="title">Title : </label>
					<input type="text" name="title" placeholder="A remplir" onChange={this.handleChangeTitle} />
				</div>
				<div>
					<label htmlFor="content">Content : </label>
					<textarea name="content" placeholder="A remplir" onChange={this.handleChangeContent}></textarea>
				</div>
				<div>
					<input type="submit" value="Enregistrer la note" />
				</div>
			</form>
		);
	}
};

export default Form;
