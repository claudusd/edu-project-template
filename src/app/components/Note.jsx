import React, { Component } from 'react';
import client from './client.js';
import { Link, browserHistory} from 'react-router';

class Note extends Component {

	constructor(props){
		super(props);
		this.state = {note: []};
		this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
	}

	componentWillMount(){
		//getting the element to display
		var callback = function(data){this.setState({note:data})};
		callback = callback.bind(this);
		client.find(this.props.params.id,callback);

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

		

		//put it in a clear variable
		var note= this.state.note;
		return (
			<div>
				<h1 className="text-center">{note.title}</h1>
				<div className="col-sm-12 blue-background padding-15">
					<button type="button" className="btn btn-danger col-sm-offset-8 col-sm-2" onClick={this.handleSubmitDelete}>Delete</button>
					<p className="col-sm-8 col-sm-offset-2 paragraph text-justify padding-15">{note.content}</p>
					<Link className="col-sm-2 col-sm-offset-2" to="/">Back</Link>
				</div>
			</div>
		)
	}

};

export default Note;
