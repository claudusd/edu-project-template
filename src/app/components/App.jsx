import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, Link, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import Form from './Form';

import List from './List';

import Note from './Note';

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



export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
					<Route path="/new" component={Form}></Route>
					<Route path="/" component={List}></Route>
					<Route path="/*" component={Note}></Route>
                </Router>
            </Provider>
        );
    }
};
