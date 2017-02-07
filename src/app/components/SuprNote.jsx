import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router'
import Client from './Client'
 
export default class SuprNote extends Component {
	
	constructor(props) {
		super(props);
		this.getNote = this.getNote.bind(this)
		this.state = {note : []};
	}
	
	getNote(data){
		this.setState({note : data});
		console.log(this.state.note);
	}
	
	componentDidMount(){
		Client.suprNote(this.getNote, this.props.params.id); 
	 }
    render() {
		
		let notes = this.state.note;
	}
};
 
