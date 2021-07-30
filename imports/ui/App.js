import React, { Component } from 'react';
import { logPageView } from '../api/utils/google-analytics';
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
                { name: 'Taibun', code: 'tb' },
                { name: 'Pe̍h-ōe-jī', code: 'po' },
                { name: 'Hoabun', code: 'hb' },
                { name: 'English', code: 'en'}
            ],
            options: { 
                renderToStaticMarkup,
                defaultLanguage: getLocale(cookies),
            }
        });
    }

    componentDidMount() {
        logPageView();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            logPageView();
        }
    }

    render() {
        return (
            <div class="content-wrapper">
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default withCookies(withLocalize(withRouter(App)));