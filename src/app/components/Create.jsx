import React, { Component, PropTypes } from 'react';
import Client from '../Client';

export default class Create extends Component {
	constructor(props) {
	    super(props);
	    this.state = {title: '', content: '', submitted: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	handleSubmit(event){
      event.preventDefault();
      const client = new Client();
      delete this.state.submitted;
      client.create(this.state);
      this.setState({submitted: true});
  	}

    handleChange(event){
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({[name]: value});
    }

    render() {
      if(!this.state.submitted){
        return(
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Titre : </label><input type="text" value={this.state.title} name="title" id="title" onChange={this.handleChange}/>
            <label htmlFor="content">Contenu : </label><textarea value={this.state.content} name="content" id="content" onChange={this.handleChange}/>
            <input type="submit" value="Ajouter"/>
          </form>
        );
      }
      else {
        return(<h1>Note créée</h1>);
      }
    }
};