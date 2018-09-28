import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { setLocale, getLocale } from '../api/locale';
import { withCookies } from 'react-cookie';

class Footer extends Component {
    constructor(props) {
        super(props);
        let pathname = props.location.pathname;

        const { cookies } = props;

        this.state = {
            background: this.footerBackground(pathname),
            locale: getLocale(cookies),
            cookies: cookies,
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

    localeChange(event) {
        const locale = event.target.value;
        setLocale(this.state.cookies, locale);
        this.setState({locale: locale});
    }

    render() {
        return (
            <div className={this.state.background}>
                <div id='locale-container'>
                    <button className={'locale-button ' + (this.state.locale === 'hb' ? 'locale-button-selected' : '')} value='hb' onClick={this.localeChange.bind(this)}>華文</button>
                    <button className={'locale-button ' + (this.state.locale === 'tb' ? 'locale-button-selected' : '')} value='tb' onClick={this.localeChange.bind(this)}>漢羅台文</button>
                    <button className={'locale-button ' + (this.state.locale === 'po' ? 'locale-button-selected' : '')} value='po' onClick={this.localeChange.bind(this)}>Pe̍h-ōe-jī</button>
                </div>
                <footer className={this.state.background}>
                    <Link id='footer-image' to='https://grants.g0v.tw/power/' target='_blank'></Link>
                </footer>
            </div>
        );
    }
}

export default withCookies(withRouter(Footer));
