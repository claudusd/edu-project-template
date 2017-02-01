import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configure from './store';
import ListNotes from './ListNotes.jsx';
import Note from './Note.jsx';
import CreateNote from './CreateNote.jsx';

const store = configure();

const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/list" component={ListNotes} ></Route>
					<Route path="/create" component={CreateNote} ></Route>
					<Route path="/note/:id" component={Note} ></Route>
                </Router>
            </Provider>
        );
    }
};
