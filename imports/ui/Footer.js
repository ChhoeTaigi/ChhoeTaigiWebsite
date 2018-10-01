import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { setLocale, getLocale } from '../api/locale';
import { withCookies } from 'react-cookie';

class Footer extends Component {
    constructor(props) {
        super(props);
        const pathname = props.location.pathname;

        const { cookies } = props;

        this.state = {
            background: this.footerBackground(pathname),
            locale: getLocale(cookies),
            cookies: cookies,
        };

        this.unlisten = this.props.history.listen((location, action) => {
            const pathname = location.pathname;
            this.setState({
                background: this.footerBackground(pathname),
            });
        });
    }

    footerBackground(pathname) {
        let background = 'footer-bg1';
        if (pathname === '/') {
            background = 'footer-bg2';
        } else if (pathname === '/chinkai') {
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
        const pathname = this.props.location.pathname;
        let localeButtonStyle = 'locale-button-g';
        let localeButtonSelectedStyle = 'locale-button-selected-g';
        if (pathname === '/') {
            localeButtonStyle = 'locale-button';
            localeButtonSelectedStyle = 'locale-button-selected';
        }
        return (
            <div className={this.state.background}>
                <div id='locale-container'>
                    <button className={localeButtonStyle + ' ' + (this.state.locale === 'tb' ? localeButtonSelectedStyle : '')} value='tb' onClick={this.localeChange.bind(this)}>漢羅台文</button>
                    <button className={localeButtonStyle + ' ' + (this.state.locale === 'po' ? localeButtonSelectedStyle : '')} value='po' onClick={this.localeChange.bind(this)}>Pe̍h-ōe-jī</button>
                    <button className={localeButtonStyle + ' ' + (this.state.locale === 'hb' ? localeButtonSelectedStyle : '')} value='hb' onClick={this.localeChange.bind(this)}>華文</button>
                    <button className={localeButtonStyle + ' ' + (this.state.locale === 'en' ? localeButtonSelectedStyle : '')} value='en' onClick={this.localeChange.bind(this)}>English</button>
                </div>
                <footer className={this.state.background}>
                    <Link id='footer-image' to='https://grants.g0v.tw/power/' target='_blank'></Link>
                </footer>
            </div>
        );
    }
}

export default withCookies(withRouter(Footer));
