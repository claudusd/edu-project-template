import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configure from './store';


import ListNote from './ListNoteComponent';
import AddNote from './AddNoteComponent';
import OneNote from './OneNoteComponent';
const store = configure();
const history = syncHistoryWithStore(browserHistory, store);




export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={ListNote}></Route>
                    <Route path="/addNote" component={AddNote}></Route>
                    <Route path="/oneNote/:id" component={OneNote}></Route>
                </Router>
            </Provider>
        );
    }
};


 