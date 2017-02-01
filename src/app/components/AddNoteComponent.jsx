import React, { Component, PropTypes } from 'react';
import Client from './Client';
export default class AddNote extends Component {




     constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault(); // prevent native submitting behavior
        var c = new Client;



        
        //console.log(React.findDOMNode(this.refs.nom).value);
        //console.log(React.findDOMNode(this.refs.contenu).value);
        console.log("SUBMIT");

        const formData = {};
        for (const field in this.refs) {
        formData[field] = this.refs[field].value;
        }

        c.create(formData);
        console.log('-->',formData);

     

    }

    render(){
        return(

         <div>
           <h1>Ajouter une nouvelle note</h1>
           <form onSubmit={this.handleSubmit}  method="POST">

                <div className="form-group">
                    <label>Titre de la note : </label>
                    <input ref="nom" type="text" className="form-control" name="nom"/>
                </div>
                <div className="form-group">
                    <label>Contenu : </label>
                    <input ref="contenu" type="text" className="form-control" name="contenu"/>
                </div>
                 <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        );
    }
};