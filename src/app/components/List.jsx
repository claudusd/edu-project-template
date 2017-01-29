import React, { Component, PropTypes } from 'react';
import Client from '../Client';

export default class List extends Component {
	constructor(props) {
	    super(props);
	    this.state = {marks: []};
  	}

  	componentWillMount() {
	    let marks = Client.findAll();
	    console.log(marks);
  		//this.setState({marks : Client.findAll()});
        //console.log(this.state);
  	}

    render() {
        return(
        	<div>
        		<h3>Notes</h3>
		      	<ul>
			        {/*{this.state.marks.map(item => (*/}
			          {/*<li key={item.id}>{item.text}</li>*/}
			        {/*))}*/}
		      	</ul>
	      </div>
        );
    }
};