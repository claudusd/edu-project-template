import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router'
import Client from './Client'
 
export default class List extends Component {
	
	constructor(props) {
		super(props);
		this.getNotes = this.getNotes.bind(this)
		this.state = {notes : []};
	}
	
	getNotes(data){
		this.setState({notes : data});
		console.log(this.state.notes);
	}
	
	componentDidMount(){
		Client.findAll(this.getNotes); 
	 }
    render() {
		
		let notes = this.state.notes;
		return (<div>
					<h1> Liste des notes </h1>
					<ul>
					{notes.map(function (note, i) {
						return <li key={i}><Link to={'/' + note.id}>{note.title}</Link></li>
					})}
					</ul>
					<a href="createNote">Ajouter une note </a>
				</div>);
	}
};
 
