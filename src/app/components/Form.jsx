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
		return (<div className="row-fluid"><h2 className="text-center">Création d'une note</h2>
			<form className="form-horizontal" onSubmit={this.handleSubmit}>
				<div className="form-group">
				<label className="col-sm-3 control-label" htmlFor="title">Title</label>
				<div className="col-sm-6">
					<input type="text" className="form-control" name="title" placeholder="A remplir" onChange={this.handleChangeTitle} />
				</div></div>
				<div className="form-group">
				<label className="col-sm-3 control-label" htmlFor="content">Content</label>
				<div className="col-sm-6">
					<textarea name="content" className="form-control" placeholder="A remplir" onChange={this.handleChangeContent}></textarea></div>
				</div>
				<div className="form-group">
				<div className="col-sm-offset-3 col-sm-6" >
					<input className="btn btn-primary" type="submit" value="Enregistrer la note" />
				</div></div>
			</form>
		</div>
		);
	}
};

export default Form;
