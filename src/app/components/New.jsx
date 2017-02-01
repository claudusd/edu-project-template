import React, { Component, PropTypes } from 'react';
import Client from './Client';
export default class New extends Component {
    
    handleSubmit(e){
        e.preventDefault();
        const c = new Client();
        c.create((this.refs.titre).value, (this.refs.contenu).value);
        console.log("done");
        //const firlData = {};
        //console.log((this.refs.titre).value);
    }

    constructor(props){
        super(props);
        this.state = {
          note: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render(){
        return(

         <div>
           <h1>Ajouter une note</h1>
           <form onSubmit={this.handleSubmit} method="POST">
                <div className="form-group">
                    <label>Titre</label>
                    <input type="text" ref="titre" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Contenu</label>
                    <input type="text" ref="contenu" className="form-control"/>
                </div>
                 <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        );
    }
};