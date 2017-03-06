import React, { Component } from 'react';
import client from './client';
import { Link, browserHistory} from 'react-router';

class CreateNote extends Component {

	constructor(props){
		super(props);
		this.state = {title:'',content:''};
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
					<h1 className="text-center">Post a new note:</h1>
					<div className="col-sm-12 blue-background padding-15" >
						<form onSubmit={this.handleSubmit} className="col-sm-offset-2 col-sm-8 text-center">
								<div className="col-sm-12 margin-15">
									<label htmlFor="title" className="col-sm-2 text-center">Title :</label>
									<input type="text" id="title" value={this.state.title}  onChange={this.handleChangeTitle} required="required" className="col-sm-4 text-left"/>
								</div>
								<div className="col-sm-12 margin-15">
									<label htmlFor="message" className="col-sm-2 text-center" >Message :</label>
									<textarea id="content" value={this.state.message}  onChange={this.handleChangeMessage} required="required" className="col-sm-8 text-left" rows="8" ></textarea>
								</div>
								<div className="col-sm-12 margin-15">
									<button type="submit" className="col-sm-offset-2 col-sm-2 text-center">Submit</button>
								</div>
						</form>
						<Link className="col-sm-offset-2 col-sm-2 text-center" to="/" >Back to list </Link>
					</div>
				</div>
			)
	}

};

export default CreateNote;
