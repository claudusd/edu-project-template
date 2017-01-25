import React, { Component, PropTypes } from 'react';

export default class Client extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={Yolo}>
                    </Route>
            </Provider>
        );
    }
};
