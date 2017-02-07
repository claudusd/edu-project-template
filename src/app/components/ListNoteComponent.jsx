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
                <div className="row">
                    <h2>
                        <Link className="link-to-addNote" to={'/addNote'}>
                            Ajouter une note
                        </Link> 
                    </h2>
                </div>
               



               
               
                {notes.map(function(note, i) {

                  return  <Link className="link-to-note" to={'/oneNote/'+note.id}>
                                <div key={i} className="note listnote col-md-6 col-md-push-3">
                    
                                    {note.nom}
                     
                     
                                </div>
                            </Link> 

                })}

            

            </div>
        );
    }
};