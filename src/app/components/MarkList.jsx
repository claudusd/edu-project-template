import React, { Component, PropTypes } from 'react';

import clientInstance from './Client';

export default class MarkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marks: null,
        };

        this.modifyAfterFindAll = this.modifyAfterFindAll.bind(this);
    }

    modifyAfterFindAll(marks) {
        this.setState({
            marks: marks
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
            <div>
                {this.state.marks.map((mark) => (
                    <div>
                        <div>Date: {mark.date}</div>
                        <div>Title: {mark.title}</div>
                        <div>Content:{mark.content}</div>
                        <a href={"/" + mark.id}>Consulter cette note</a>
                    </div>
                ))}
            </div>
        );
    }
};