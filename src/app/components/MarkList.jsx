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

    deleteMark(id){
        clientInstance.remove(id,this.infoAfterDelete)
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
            <div>
                {this.state.marks.map((mark) => (
                    <div>
                        <div>Date: {mark.date}</div>
                        <div>Title: {mark.title}</div>
                        <div>Content:{mark.content}</div>
                        <Link to={`/${mark.id}`}>Consulter cette note</Link>
                        <button onClick={() => this.deleteMark(mark.id)}>Supprimer la note</button>
                    </div>
                ))}
            </div>
        );
    }
};