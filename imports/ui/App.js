import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { logPageView } from '../api/analytics';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        logPageView();
    }

    componentDidUpdate() {
        logPageView();
    }

    render() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default withRouter(App);