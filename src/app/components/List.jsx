import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Client from '../Client';

export default class List extends Component {
	constructor(props) {
	    super(props);
	    this.state = {marks: []};
  	}

  	getMarks(data){
		this.setState({marks : data});
  	}

  	componentDidMount() {
  		const client = new Client();
	    let marks = client.findAll(this.getMarks.bind(this));
  	}

    render() {
    	console.log(this.state.marks);
    	let marksList = this.state.marks.map(mark => { return <li key={mark.id}><Link to={'/' + mark.id}>{mark.title}</Link></li>; });
        return(
        	<div>
        		<h3>Notes</h3>
		      	<ul>
		      		{marksList}
		      	</ul>
		      	<Link to="/new">Ajouter une note</Link>
	      </div>
        );
    }
};