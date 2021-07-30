import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { withTracker } from 'meteor/react-meteor-data';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import footerTranslations from '../../translations/footer.json';

import { setLocale, getLocale } from '../../api/utils/locale';
import { Minimongo } from '../../api/database/minimongo';

class Footer extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(footerTranslations);

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
        let background = '';
        if (pathname === '/') {
            background = 'site-footer--darkgreen';
        } else if (pathname === '/chinkai') {
            background = 'site-footer--lightgreen';
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
        const sessions = commafy(this.props.sessions);
        const clicks = commafy(this.props.clicks);

        return (
            <footer className={'site-footer ' + this.state.background}>
                <div className='container'>
                    <ul className='langs'>
                        <li><button className={'langs__btn ' + (this.state.locale === 'tb' ? 'active' : '')} value='tb' onClick={this.localeChange.bind(this)}>羅漢台文</button></li>
                        {/*<li><button className={'langs__btn ' + (this.state.locale === 'po' ? 'active' : '')} value='po' onClick={this.localeChange.bind(this)}>Pe̍h-ōe-jī</button></li>*/}
                        <li><button className={'langs__btn ' + (this.state.locale === 'hb' ? 'active' : '')} value='hb' onClick={this.localeChange.bind(this)}>華文</button></li>
                        {/*<li><button className={'langs__btn ' + (this.state.locale === 'en' ? 'active' : '')} value='en' onClick={this.localeChange.bind(this)}>English</button></li>*/}
                    </ul>
                </div>
                <div className='container site-footer__status'>
                    <ul className='visit-status'>
                        <li><Translate id='visitors' />：{sessions}</li>
                        <li><Translate id='searches' />：{clicks}</li>
                    </ul>
                    <ul className='site-status'>
                        <li><Translate id='word_count_desc' /></li>
                        <li><Translate id='book_index_desc' /></li>
                        <li><Translate id='since' /></li>
                    </ul>
                </div>
                <div className='g0v'>
                    <Link className='g0v-logo' to='https://grants.g0v.tw/power/' target='_blank'><span className='sr-only'>Powered by G0V</span></Link>
                </div>
            </footer>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('minimongo');
    const minimongo = Minimongo.findOne();
    if (minimongo === undefined) {
        return {
            sessions: 0,
            clicks: 0,
        };
    } else {
        return {
            sessions: minimongo.sessions,
            clicks: minimongo.clicks,
        };
    }
})(withCookies(withLocalize(withRouter(Footer))));

function commafy(num) {
    if (num == null) {
        return ""
    }

    var str = num.toString();
    if (str.length > 3) {
        str = str.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str;
}
