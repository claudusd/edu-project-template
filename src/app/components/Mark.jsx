import React, { Component, PropTypes } from 'react';

import { browserHistory } from 'react-router';

import clientInstance from './Client';

export default class Mark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mark: [],
        };

        this.modifyAfterFind = this.modifyAfterFind.bind(this);
        this.infoAfterDelete = this.infoAfterDelete.bind(this);
    }

    modifyAfterFind(mark) {
        this.setState({
            mark: mark
        })
    }


    infoAfterDelete(info) {
        browserHistory.push('/');
    }

    deleteMark(id){
        clientInstance.remove(id,this.infoAfterDelete)
    }

    componentDidMount() {
        clientInstance.find(this.props.params.id, this.modifyAfterFind)
    }

    render() {
        if(this.state.mark.length === 0) {
            return <div>Aucune donnée</div>;
        }
        return (
            <div className="row">
            <div className="card">
            <div className="card-content">
            <span className="card-title">{this.state.mark.title}</span>
            <div>Date: {this.state.mark.date}</div>
            <div>Valeur:{this.state.mark.content}</div>

            </div>
            <div className="card-action">
            <button className="waves-effect waves-light btn" onClick={() => this.deleteMark(this.state.mark.id)}>Supprimer la note</button>

            </div>
            </div>

            </div>
            );
    }
};
