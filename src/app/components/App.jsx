import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';

import List from './List';
import Note from './Note';
import Create from './Create';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={List}>
                    </Route>
                    <Route path="/new" component={Create}>
                    </Route>
                    <Route path="/:id" component={Note}>
                    </Route>
                </Router>
            </Provider>
        );
    }
};
