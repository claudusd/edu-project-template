import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import clientInstance from './Client';

export default class MarkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marks: null,
        };

        this.modifyAfterFindAll = this.modifyAfterFindAll.bind(this);
        this.infoAfterDelete = this.infoAfterDelete.bind(this);
        //this.deleteMark = this.deleteMark.bind(this);
    }

    modifyAfterFindAll(marks) {
        this.setState({
            marks: marks
        })
    }

    infoAfterDelete(info) {
        //browserHistory.push('/');
        /*this.setState({
            info: info
        })*/
    }

    deleteMark(id) {
        clientInstance.remove(id,this.infoAfterDelete)
        var tmpMarks = this.state.marks;
        for (var i in tmpMarks) {
            console.log(tmpMarks[i]);
            if (tmpMarks[i].id === id) {
                tmpMarks.splice(i, 1);
            }
        }
        this.setState({
            marks: tmpMarks
        })
    }

    componentDidMount() {
        clientInstance.findAll(this.modifyAfterFindAll)
    }

    render() {
        if(!this.state.marks) {
            return <div>Loading</div>;
        }
        if(!this.state.marks.length === 0) {
            return <div>Aucune donnée</div>;
        }
        return (

/*
            <div class="row">
            <div class="col s12 m6">
            <div class="card blue-grey darken-1">
            <div class="card-content white-text">
            <span class="card-title">Card Title</span>
            <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
            <a href="#">This is a link</a>
            <a href="#">This is a link</a>
            </div>
            </div>
            </div>
            </div>

            */
            <div>
            <table>
            <thead>
            <tr>
            <th data-field="id">Nom</th>
            <th data-field="name">Date</th>
            <th data-field="action">Consult</th>
            <th data-field="Delete">Delete</th>
            </tr>
            </thead>
            <tbody>
            {this.state.marks.map((mark) => (
                <tr>
                <th>{mark.title}</th>
                <th>{mark.date}</th>
                <th><Link to={`/${mark.id}`}><a className="btn-floating"><i className="material-icons">send</i></a></Link></th>
                <th><button className="btn waves-effect waves-light  red" onClick={() => {
                    this.deleteMark(mark.id);
                    Materialize.toast('One note has been deleted', 1000);
                }}>
                <i className="material-icons left">delete_forever</i>Delete</button>

                </th>
                </tr>
                ))}
            </tbody>
            </table>
            </div>
            );
    }
};