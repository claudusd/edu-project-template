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

class New extends Component {
    render(){
        return(
       
         <div>
           <h1>Ajouter une note</h1>
           <form>
                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Contenu</label>
                    <input type="text" class="form-control"/>
                </div>
                 <button type="submit" class="btn btn-primary">Submit</button>
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
                    <Route path="/new" component={New}>
                    </Route>
                </Router>
            </Provider>
        );
    }
};
