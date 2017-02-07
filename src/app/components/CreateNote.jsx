import React, { Component, PropTypes } from 'react';

import { Link, browserHistory } from 'react-router'
import Client from './Client'
 
export default class CreateNote extends Component {
	
	constructor(props) {
		super(props);
		this.state = {title: '', content : '', note: []};
		
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeContent = this.handleChangeContent.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	
	redirect(data){
		console.log(data);
		browserHistory.push('/'+data.id);
	}
	
	 handleChangeTitle(event) {	
		this.setState({title : event.target.value});
	 }
	
	
	 handleChangeContent(event) {	
		this.setState({content : event.target.value});
	 }

	 handleSubmit(event) {
	 	
		event.preventDefault();
		
		let note = JSON.parse('{"title" : "' + this.state.title + '","content":"' + this.state.content + '"}');
		this.setState({note: note});
		
		Client.createNote(this.redirect, note);	
		
	 }
	
	
	
    render() {
		return (
						<form onSubmit={this.handleSubmit}>
							<label for="title">Titre</label>
							<input type="text" id="title" value={this.state.title} onChange={this.handleChangeTitle} ></input>
							<label for="content">Contenu</label>
							<textarea id="content" value={this.state.content} onChange={this.handleChangeContent} ></textarea>
							<button type="submit">Envoyer</button>
						</form>
		);				
		
	}
};
 
