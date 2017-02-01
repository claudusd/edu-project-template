import React, { Component } from 'react';
import client from './client.js';

class Note extends Component {

	constructor(props){
		super(props);
		this.state = {note: []};
		var that = this;
		console.log(this.props.params.id);
		client.find(that.props.params.id,function(data){
			that.setState({note:data});
		});
	}
	
	render(){
		var note= this.state.note;
		return (
			<div>
				<h1>{note.title}</h1>
				<p>{note.content}</p>
			</div>
		)
	}
   
};

export default Note;

