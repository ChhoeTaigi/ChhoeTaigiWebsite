import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import { withCookies } from 'react-cookie';

import { getLocale } from '../api/utils/locale';

import Header from './main/Header';
import Main from './main/Main';
import Footer from './main/Footer';

class App extends Component {
    constructor(props) {
        super(props);

        const { cookies } = props;

        props.initialize({
            languages: [
                { name: '漢Lô', code: 'lang_hanlo' },
                { name: 'POJ', code: 'lang_poj' },
                { name: '中文', code: 'lang_tiongbun' },
                { name: 'English', code: 'lang_engbun' },
                { name: '日本語', code: 'lang_jitbun' }
            ],
            options: {
                renderToStaticMarkup,
                defaultLanguage: getLocale(cookies),
            }
        });
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <div className="content-wrapper">
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default withCookies(withLocalize(withRouter(App)));