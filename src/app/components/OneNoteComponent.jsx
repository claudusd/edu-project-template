import React, { Component, PropTypes } from 'react';
import Client from './Client';
export default class OneNote extends Component {

	componentWillMount() {
        var c = new Client;
        c.find(this.props.params.id, this.setNote);
        
    };

    constructor(props) {
        super(props);
        this.state = { note : [] };

        this.setNote = this.setNote.bind(this);

        
    }

    setNote(json){
        this.setState({note : json})
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
	                  	<button>
	                  		<a to={'/'+note.id}>
	                        	Delete
	                    	</a>  
	                    </button>
                	</h4>
                     
                    
            
           
        </div>
        );
    }
};

