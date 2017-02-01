import React, { Component, PropTypes } from 'react';

import clientInstance from './Client';

export default class Mark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mark: null,
        };
        
        this.modifyAfterFind = this.modifyAfterFind.bind(this);
    }

    modifyAfterFind(mark) {
        this.setState({
            mark: mark
        })
    }

    componentDidMount() {
        clientInstance.find(this.props.params.id, this.modifyAfterFind)
    }

    render() {
        if(!this.state.mark) {
            return <div>Loading</div>;
        }
        if(!this.state.mark.length === 0) {
            return <div>Aucune donnée</div>;
        }
        return (
            <div>
                    <div>
                        <div>Date: {this.state.mark.date}</div>
                        <div>Title: {this.state.mark.title}</div>
                        <div>Content:{this.state.mark.content}</div>
                    </div>
            </div>
        );
    }
};