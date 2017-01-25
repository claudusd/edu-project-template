import React, { Component, PropTypes } from 'react';

import Client from './Client';

export default class MarkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          marks: null,
        };
    }
    componentDidMount() {
        //console.log(Client.findAll);
        fetch('/notes')
            .then(response => response.json())
            .then((marks) => { this.setState({ marks }); });
        console.log(this.state);
    }
    render() {
        if(!this.state.marks) {
            return <div>Loading</div>;
        }
        return (
            <div>
                <div>
                    <span>Id: </span>
                    <span>Date: </span>
                    <span>Title: </span>
                    <span>Content: </span>
                </div>
            </div>
        );
    }
};

/*

{this.state.marks.map((mark) => 
                    <div>
                        <span>Id: </span>
                        <span>Date: </span>
                        <span>Title: </span>
                        <span>Content: </span>
                    </div>
                )}

*/