import React, { Component, PropTypes } from 'react';

export default class List extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/notes" component={Yolo}>
                    </Route>
                </Router>
            </Provider>
        );
    }
};
