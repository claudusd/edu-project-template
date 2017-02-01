import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Client from './Client';
export default class ListNote extends Component {


    componentDidMount() {
        var c = new Client;
        c.findAll(this.setNotes);
        
    };

    constructor(props) {
        super(props);
        this.state = { notes : [] };

        this.setNotes = this.setNotes.bind(this);

        
    }

    setNotes(json){
        console.log(json);
        this.setState({notes : json})
    }



    render(){
        const notes = this.state.notes
        return(

            <div>

               <h1>Liste de toutes les notes</h1>

               <Link to={'/addNote'}>
                        Ajouter une nom
                </Link> 
                

               
               
                {notes.map(function(note, i) {
                  return  <div key={i} className="note">
                    <Link to={'/oneNote/'+note.id}>
                        {note.nom}
                    </Link>  
                     
                    </div>

                })}

            

            </div>
        );
    }
};