import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Client from '../Client';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {marks: []};

        this.getMarks = this.getMarks.bind(this);
    }

    getMarks(data) {
        this.setState({marks: data});
    }

    componentDidMount() {
        const client = new Client();
        client.findAll(this.getMarks);
    }

    render() {
        let marks;
        if (!Array.isArray(this.state.marks)) {
            marks = <p>{this.state.marks}</p>;
        } else {
            marks = this.state.marks.map(function (mark) {
                return <li className="list-group-item" key={mark.id}><Link style={{fontVariant: "small-caps"}} to={'/' + mark.id}>{mark.title}</Link></li>;
            });
        }
        return (
            <div className="row-fluid">
                <h3>Notes</h3>
                <ul className="list-group">
                    {marks}
                </ul>
                <div className="col-xs-4">
                    <Link className="btn btn-info text-center" to="/new">Ajouter une note</Link>
                </div>
            </div>
        );
    }
};