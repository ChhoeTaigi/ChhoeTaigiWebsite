import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { withCookies } from 'react-cookie';
import { withTracker } from 'meteor/react-meteor-data';

import { setLocale, getLocale } from '../api/locale';
import { Data } from '../api/data';

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
        setLocale(this, locale);
    }

    render() {
        const pathname = this.props.location.pathname;
        let localeButtonStyle = 'locale-button-g';
        let localeButtonSelectedStyle = 'locale-button-selected-g';
        let visitContainerStyle = 'visit-container-b';
        if (pathname === '/') {
            localeButtonStyle = 'locale-button-w';
            localeButtonSelectedStyle = 'locale-button-selected';
            visitContainerStyle = 'visit-container-w';
        }

        const sessions = commafy(this.props.sessions);
        const clicks = commafy(this.props.clicks);

        return (
            <div className={this.state.background}>
                <div id='footer-top-container' className={visitContainerStyle}>
                    <div id='visit-container'>
                        <div>造訪人數：{sessions}</div>
                        <div>查詢次數：{clicks}</div>
                    </div>
                    <div id='locale-container'>
                        <button className={'locale-button ' + localeButtonStyle + ' ' + (this.state.locale === 'tb' ? localeButtonSelectedStyle : '')} value='tb' onClick={this.localeChange.bind(this)}>漢羅台文</button>
                        {/*
                        <button className={'locale-button ' + localeButtonStyle + ' ' + (this.state.locale === 'po' ? localeButtonSelectedStyle : '')} value='po' onClick={this.localeChange.bind(this)}>Pe̍h-ōe-jī</button>
                        */}
                        <button className={'locale-button ' + localeButtonStyle + ' ' + (this.state.locale === 'hb' ? localeButtonSelectedStyle : '')} value='hb' onClick={this.localeChange.bind(this)}>華文</button>
                        {/*
                        <button className={'locale-button ' + localeButtonStyle + ' ' + (this.state.locale === 'en' ? localeButtonSelectedStyle : '')} value='en' onClick={this.localeChange.bind(this)}>English</button>
                        */}
                    </div>
                </div>
                
                <footer className={this.state.background}>
                    <Link id='footer-image' to='https://grants.g0v.tw/power/' target='_blank'></Link>
                </footer>
            </div>
        );
    }
}

export default  withTracker(() => {
    Meteor.subscribe('data');
    const data = Data.findOne();
    if (data === undefined) {
        return {
            sessions: 0,
            clicks: 0,
        };
    } else {
        return {
            sessions: data.sessions,
            clicks: data.clicks,
        };
    }
})(withCookies(withLocalize(withRouter(Footer))));

function commafy(num) {
    var str = num.toString();
    if (str.length > 3) {
        str = str.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str;
}
