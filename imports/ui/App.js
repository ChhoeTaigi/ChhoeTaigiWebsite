import React, { Component } from 'react';
import ReactGA from 'react-ga';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default class App extends Component {
    constructor(props) {
        super(props);

        ReactGA.initialize([{
            trackingId: 'UA-124171318-1'
        }, {
            trackingId: 'UA-124171318-2'
        }], { debug: true });
    }

    componentDidMount() {
        ReactGA.pageview(window.location.pathname);
    }
    componentDidUpdate() {
        ReactGA.pageview(window.location.pathname);
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