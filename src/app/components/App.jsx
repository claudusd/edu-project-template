import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);

class Yolo extends Component {
    render() {
        return(<h1>Hello World !!</h1>);
    }
};

class Swag extends Component {
    render() {
        return(<h1>Swag</h1>);
    }
};

class Marks extends Component {
    getMarks() {
        return fetch('http://localhost:3000/notes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            /*body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            })*/
        })
    }
    render() {

    }
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={Yolo}>
                    </Route>
                    <Route path="/new" component={Swag}>
                    </Route>
                </Router>
            </Provider>
        );
    }
};
