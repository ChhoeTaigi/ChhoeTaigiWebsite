import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer className={this.props.footerBackground}>
                <a id='footer-img' href='https://grants.g0v.tw/power/' target='_blank'></a>
            </footer>
        );
    }
}
