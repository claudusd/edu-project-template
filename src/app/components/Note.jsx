import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Client from '../Client';

export default class Note extends Component {
	constructor(props) {
	    super(props);
	    this.state = {mark: {}};
  	}

  	getMark(data){
		  this.setState({mark : data});
  	}

  	componentDidMount() {
  		const client = new Client();
      let id = this.props.params.id;
	    let mark = client.findOneById(id, this.getMark.bind(this));
  	}

    deleteNote(id){
      const client = new Client();
      client.remove(id);
    }

    render() {
    	console.log(this.state.mark);
      let mark = this.state.mark;
        return(
          <div>
          	<div>
          		<h2>{mark.title}</h2>
              <p>{mark.content}</p>
              <small>Edited at {mark.date}</small>
  	       </div>
              <button onClick={() => this.deleteNote(mark.id)}>Supprimer</button>
              <Link to='/'>Retour à la liste</Link>
        </div>
        );
    }
};