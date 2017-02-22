import React, { Component, PropTypes } from 'react';
import Client from './Client';
import {browserHistory} from 'react-router';
export default class New extends Component {

    handleSubmit(e) {
        e.preventDefault();
        const c = new Client();
        c.create((this.refs.titre).value, (this.refs.contenu).value, this.redirectAfter);
        console.log("done");
        //const firlData = {};
        //console.log((this.refs.titre).value);
    }

    constructor(props) {
        super(props);
        this.state = {
            note: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectAfter = this.redirectAfter.bind(this);
    }

    redirectAfter() {
        browserHistory.push('/');
    }

    render() {
        return(
                <div class="jumbotron vertical-center">
                
                    <div class="container text-center">
                        <div className=" row col-md-4 col-md-offset-4">
                            <form role="form" onSubmit={this.handleSubmit} method="POST">
                                <fieldset>
                                    <h2>Ajouter une note</h2>
                                    <hr className="colorgraph"/>
                                    <div className="form-group">
                                        <input ref="titre"  className="form-control input-lg" placeholder="Titre" required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" ref="contenu" className="form-control input-lg" placeholder="Contenu" required/>
                                    </div>
                                    <hr className="colorgraph"/>
                                    <div className="row">
                                        <button type="submit"  className="btn btn-lg btn-primary btn-block">Submit</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>

                );
    }
};