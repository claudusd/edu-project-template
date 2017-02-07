import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import List from './List';
import Note from './Note';
import SuprNote from './SuprNote';
import CreateNote from './CreateNote';

import configure from './store';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={List}>
                    </Route>
                    <Route path="/createNote" component={CreateNote}>
                    </Route>      
                    <Route path="/:id" component={Note}>
                    </Route>                
                </Router>
            </Provider>
        );
    }
};
