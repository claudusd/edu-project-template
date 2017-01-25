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

class FormNote extends Component {
    render() {
        return(	
		<div>
			<h1>Création d'une note </h1>

			<form method="post">
				<label>Nom : </label>
				<input type="text"/>

				<label> Contenu : </label>
				<input type="text"/>
			</form>
		</div>
	);
    }
};

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={Yolo}>
                    </Route>
                    <Route path="/addNote" component={FormNote}>
                    </Route>
                </Router>
            </Provider>
        );
    }
};
