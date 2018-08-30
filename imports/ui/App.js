import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            footer_background: 'footer-bg1',
        };
    }

    setFooterBackground(footer_background) {
        this.setState({
            footer_background: footer_background,
        });
    }

    render() {
        return (
            <div>
                <Header />
                <Main setFooterBackground={this.setFooterBackground.bind(this)} />
                <Footer footerBackground={this.state.footer_background} />
            </div>
        );
    }
}