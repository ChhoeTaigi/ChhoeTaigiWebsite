import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { logPageView } from '../api/analytics';
import { withLocalize } from "react-localize-redux";
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../translations/header.json";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class App extends Component {
    constructor(props) {
        super(props);

        props.initialize({
            languages: [
                { name: "Hoabun", code: "hb" },
                { name: "Taibun", code: "tb" },
                { name: "Pe̍h-ōe-jī", code: "po" },
            ],
            translation: globalTranslations,
            options: { 
                renderToStaticMarkup,
                defaultLanguage: "tb", 
            }
        });
    }

    componentDidMount() {
        logPageView();
    }

    componentDidUpdate() {
        logPageView();
    }

    render() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default withLocalize(withRouter(App));