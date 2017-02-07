import React, { Component } from 'react';
import client from './client';
import { Link, browserHistory} from 'react-router';

class CreateNote extends Component {

	constructor(props){
		super(props);
		this.state = {};
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleChangeMessage = this.handleChangeMessage.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeTitle(event) {
    	this.setState({title: event.target.value});
  	}

  	handleChangeMessage(event) {
    	this.setState({content: event.target.value});
  	}				

	 handleSubmit(event) {
	 	let callback = function(jsonNoteId){
			console.log("Redirecting to the note with id: "+jsonNoteId['id']);
			browserHistory.push('/note/'+jsonNoteId['id']);
		};
		callback = callback.bind(this);
	 	event.preventDefault();
		client.create(({title:this.state.title,content:this.state.content}),callback);
  	}
	
	render(){
		
			return (
				<div>
					<h1>New note:</h1>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="title">Title :</label>
						<br />
						<input id="title" value={this.state.title}  onChange={this.handleChangeTitle} />
						<br />
						<label htmlFor="message">Message :</label>
						<br />
						<textarea id="content" value={this.state.message}  onChange={this.handleChangeMessage}></textarea>
						<br />
						<button type="submit" >Submit</button>
					</form>
					<br />
					<Link to="/" >Back to list </Link>
				</div>
			)
	}
   
};

export default CreateNote;


