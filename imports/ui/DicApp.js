import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import dicAppTranslations from '../translations/app.json';

class DicApp extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(dicAppTranslations);

        this.state = {
            background_height: window.innerHeight - 96,
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 96,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        return (
            <div id='app-container' style={{minHeight: this.state.background_height + 'px'}}>
                <h1 id='app-title'>ChhoeTaigi 台語辭典APP</h1>
                <div id='app-content'>
                    <span  id='app-description'><Translate id='description' /></span>
                    <div id='dic-link-group'>
                        <div id='dic-link-1'>
                            <span>iOS版</span>
                            <img src='images/iOS_QR@2x.png' width='100' height='100'></img>
                            <a href='https://itunes.apple.com/tw/app/chhoetaigi-%E5%8F%B0%E8%AA%9E%E8%BE%AD%E5%85%B8-taigi-dict/id1437125209' target='_blank'>
                                <img src='images/iOS@2x.png' width='136' height='50'></img>
                            </a>
                        </div>
                        <div  id='dic-link-2'>
                            <span>Android版</span>
                            <img src='images/android@2x.png' width='110' height='110'></img>
                            <span><Translate id='sponsor' /></span>
                        </div>
                    </div>
                </div>
                <img id='app-img' src='images/app_pic@2x.png' width='622' height='428'></img>
            </div>
        );
    }
}

export default withLocalize(withRouter(DicApp));