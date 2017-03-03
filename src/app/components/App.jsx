import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';

import FormMark from './FormMark';
import MarkList from './MarkList';
import Mark from './Mark';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={MarkList}>
                    </Route>
                    <Route path="/new" component={FormMark}>
                    </Route>
                    <Route path="/:id" component={Mark}>
                    </Route>
                </Router>
            </Provider>
        );
    }
};
