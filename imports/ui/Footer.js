import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <footer className={this.props.footerBackground}>
                <Link id='footer-image' to='https://grants.g0v.tw/power/' target='_blank'></Link>
            </footer>
        );
    }
}
