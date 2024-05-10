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
                        <li><button className={'langs__btn ' + (this.state.locale === 'lang_hanlo' ? 'active' : '')} value='lang_hanlo' onClick={this.localeChange.bind(this)}>漢Lô</button></li>
                        <li><button className={'langs__btn ' + (this.state.locale === 'lang_poj' ? 'active' : '')} value='lang_poj' onClick={this.localeChange.bind(this)}>POJ</button></li>
                        <li><button className={'langs__btn ' + (this.state.locale === 'lang_engbun' ? 'active' : '')} value='lang_engbun' onClick={this.localeChange.bind(this)}>English</button></li>
                        <li><button className={'langs__btn ' + (this.state.locale === 'lang_jitbun' ? 'active' : '')} value='lang_jitbun' onClick={this.localeChange.bind(this)}>日本語</button></li>
                        <li><button className={'langs__btn ' + (this.state.locale === 'lang_tiongbun' ? 'active' : '')} value='lang_tiongbun' onClick={this.localeChange.bind(this)}>中文</button></li>
                    </ul>
                </div>
                <div className='container site-footer__status'>
                    <ul className='site-footer__status-visit'>
                        <li><Translate id='since' /></li>
                        <li><Translate id='visitors' />：{sessions}</li>
                        <li><Translate id='searches' />：{clicks}</li>
                        <li><Translate id='word_count_desc' /></li>
                    </ul>
                    <ul className='site-footer__status-site'>
                        <li><Translate id='book_index_desc' /></li>
                        <li><Translate id='web_index_desc' /></li>
                        <li><Translate id='bunhaktuchok_index_desc' /></li>
                        <li><Translate id='word_jitpunsitai_desc' /></li>
                    </ul>
                </div>
                <div className='container site-footer__sponsors-text'>
                    <Translate id='sponsors' />
                </div>
                <div className='container site-footer__sponsors-logo'>
                    <ul className='site-footer__sponsors-logo-list'>
                        <li>
                            <Link to={{ pathname: 'https://hoatki.de-han.org/' }} target='_blank'>
                                <img className='sponsor-logo' src='/images/sponsor_logo_hoatki.jpg' alt='Hoat-Ki Tâi-gí Ki-kim-hōe 蔣發太孫玉枝台語文教育基金會' />
                            </Link>
                        </li>
                    </ul>
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
    if (num === null) {
        return ""
    }

    var str = num.toString();
    if (str.length > 3) {
        str = str.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str;
}
