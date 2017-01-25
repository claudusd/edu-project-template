import React, { Component, PropTypes } from 'react';
import Client from '../Client';

export default class List extends Component {
	constructor(props) {
	    super(props);
	    this.state = {marks: []};
  	}

  	componentWillMount() {
  		console.log(Client);
  	}

    render() {
        return(
        	<div>
        		<h3>Notes</h3>
		      	<ul>
			        {this.props.marks.map(item => (
			          <li key={item.id}>{item.text}</li>
			        ))}
		      	</ul>
	      </div>
        );
    }
};