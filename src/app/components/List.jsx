import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router'
import Client from './Client';
export default class List extends Component {

    componentDidMount() {
        const c = new Client();
        c.findAll(this.setNotes);
    }
    ;
            setNotes(json) {
        this.setState({notes: json});
    }

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
        this.setNotes = this.setNotes.bind(this)
    }

    render() {
        return(
                <div className="col-md-4 col-md-offset-4">
                    <h2 className="text-center">Notes!</h2>
                    <hr className="colorgraph"/>
                    <div className="row">
                        <ul className="list-unstyled">
                            {this.state.notes.map(function (note) {
                                            return (
                                                <div key={note.id} className="note">
                                                    <li>
                                                            <Link className="option blackpropre" to={'/one/' + note.id} >
                                                            <button className="btn bluecool icon-btn  col-md-12">
                                                            {note.title}
                                                            </button></Link>
                                    
                                                    </li>
                                                    <hr className="colorgraph"/>
                                                </div>
                                                    );
                            })}
                        </ul>
                    </div>
                    <div className="row">
                        <hr className="colorgraph"/>
                    </div>
                    <div className="row">
                        <Link className="option propre" to={'/new'}><button type="button"  className="btn btn-md btn-block purplecool">Ajouter une Note</button></Link>
                    </div>
                </div>


                            );
            }
        };