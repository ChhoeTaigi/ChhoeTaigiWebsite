import React, { Component } from 'react';
import ReactGA from 'react-ga';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default class App extends Component {
    componentDidMount() {
        ReactGA.initialize([{
            trackingId: 'UA-124171318-1'
        }, {
            trackingId: 'UA-124171318-2'
        }], { debug: true });
    }

    render() {
        ReactGA.pageview(window.location.pathname);
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}