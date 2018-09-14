import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const page = this.props.location.pathname;
        ReactGA.set({ page });
        ReactGA.pageview(page);
    }

    componentDidUpdate() {
        const page = this.props.location.pathname;
        ReactGA.set({ page });
        ReactGA.pageview(page);
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