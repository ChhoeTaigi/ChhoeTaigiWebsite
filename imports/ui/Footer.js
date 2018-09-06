import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
        let pathname = props.location.pathname;

        this.state = {
            background: this.footerBackground(pathname),
        };

        this.unlisten = this.props.history.listen((location, action) => {
            let pathname = location.pathname;
            this.setState({
                background: this.footerBackground(pathname),
            });
        });
    }

    footerBackground(pathname) {
        let background = 'footer-bg1';
        if (pathname === '/') {
            background = 'footer-bg2';
        } else if (pathname === '/advanced') {
            background = 'footer-bg3';
        }

        return background;
    }

    componentWillUnmount() {
        this.unlisten();
    }


    render() {
        return (
            <footer className={this.state.background}>
                <Link id='footer-image' to='https://grants.g0v.tw/power/' target='_blank'></Link>
            </footer>
        );
    }
}

export default withRouter(Footer);
