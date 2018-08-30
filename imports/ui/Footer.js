import React, { Component } from 'react';

import '../../public/stylesheets/header.css';

export default class Footer extends Component {
    render() {
        console.log(this.props.footerBackground);
        return (
            <footer className={this.props.footerBackground}>
                <a id='footer-img' href='https://grants.g0v.tw/power/' target='_blank'></a>
            </footer>
        );
    }
}
