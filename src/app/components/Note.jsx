import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Client from '../Client';

export default class Note extends Component {
	constructor(props) {
	    super(props);
	    this.state = {mark: {}};
	    this.getMark = this.getMark.bind(this);
	    this.deleted = this.deleted.bind(this);
  	}

  	getMark(data){
		  this.setState({mark : data});
  	}

  	componentDidMount() {
  		const client = new Client();
      let id = this.props.params.id;
	    client.findOneById(id, this.getMark);
  	}

    deleteNote(id){
      const client = new Client();
      client.remove(id, this.deleted);
    }

    deleted(message){
        this.setState({deleted: message});
    }

    render() {
        if(undefined === this.state.deleted) {
            let mark = this.state.mark;
            return (
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
        } else {
            return(<div><h2>{this.state.deleted}</h2><Link to='/'>Retour à la liste</Link></div>)
        }
    }
};