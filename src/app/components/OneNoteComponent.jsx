import React, { Component, PropTypes } from 'react';
import Client from './Client';
import { browserHistory } from 'react-router';
export default class OneNote extends Component {

	componentDidMount() {
      	var c = new Client;
        c.find(this.props.params.id, this.setNote);
        
    };

    constructor(props) {
        super(props);
        this.state = { note : [] };

        this.setNote = this.setNote.bind(this);
        this.redirectAfter = this.redirectAfter.bind(this);   
    }

    setNote(json){
        this.setState({note : json})
    }

    redirectAfter(){
        browserHistory.push('/');
    }

    removeNote(id){
    	var cl = new Client;
    	cl.delete(id,this.redirectAfter);
    }


    render(){

    	const note = this.state.note;

  
        return(

         <div>
           <h1>Une note :</h1>
           			
	                <h3> Titre: {note.nom} </h3>
	                <h4>Contenu : {note.contenu} </h4>
	                <h4>Date : {note.date}</h4>
	                <h4>
	                 <button onClick={()=> this.removeNote(note.id)}>Supprimer</button>
                	</h4>                                         
        </div>
        );
    }
};

