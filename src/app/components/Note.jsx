import React, { Component, PropTypes } from 'react';
import {Link, browserHistory} from 'react-router';
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
        browserHistory.push('/');
    }

    render() {
          let mark = this.state.mark;
          let date = new Date(mark.date * 1000).toLocaleString();

          return (
              <div className="row-fluid">
                  <div className="col-xs-8">
                    <div className="row">
                        <h2>{mark.title}</h2>
                        <p>{mark.content}</p>
                        <small>Editée le {date}</small>
                    </div>
                    <Link to='/'>Retour à la liste</Link>
                    <br/>
                    <br/>
                  <div className="row">
                    <button className="btn btn-danger" onClick={() => this.deleteNote(mark.id)}>Supprimer</button>
                  </div>
                </div>
              </div>
          );
    }
};