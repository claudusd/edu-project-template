import React, { Component } from 'react';
import client from './client.js';
import { Link, browserHistory} from 'react-router';

class Note extends Component {

	constructor(props){
		super(props);
		this.state = {note: []};
		this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
	}



	handleSubmitDelete(event) {

		var callback = function(response){
			console.log('Element deleted! Redirect on note list...');
			browserHistory.push("/");
		};
		callback = callback.bind(this);
		client.delete(this.props.params.id, callback);
	}
	render(){

		//getting the element to display
		var callback = function(data){this.setState({note:data})};
		callback = callback.bind(this);
		client.find(this.props.params.id,callback);

		//put it in a clear variable
		var note= this.state.note;
		return (
			<div>
				<h1 class="text-center">{note.title}</h1>
				<p>{note.content}</p>				
				<br/>
				<Link to="/">Back</Link>
				<br/>
				<button type="button" onClick={this.handleSubmitDelete}>Delete</button>
			</div>
		)
	}
   
};

export default Note;

