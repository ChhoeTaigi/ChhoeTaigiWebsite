import React, { Component } from 'react';

import dicStruct from '../api/dictionary_struct';

import BriefWord from './BriefWord';

export default class SingleDic extends Component {
    constructor(props) {
        super(props);

        let state = props.location.state;
        if (!state) {
            props.history.replace('/');
        }

        const dic = state.options.dic;
        const params = state.options.params;
        let keywords = [];
        for (let key in params) {
            let param = params[key].replace(/\s/g, '');
            if (param !== '' && key !== 'searchMethod' && key !== 'spellingMethod') {
                keywords.push(param)
            }
        }
        keywords = keywords.join('，');
        const struct = dicStruct.filter(struct => struct.name===dic)[0];
        const chineseName = struct.chineseName;

        // num
        const num = state.allResults.num[0].num;

        this.state = {
            dic: dic,
            keywords: keywords,
            num: num,
            chineseName: chineseName,
            words: state.allResults.words,
            background_height: window.innerHeight - 120,
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 120,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    scrollToTop(event) {
        window.scrollTo(0, 0);
        event.preventDefault();
    }

    render() {
        return (
            <div style={{minHeight: this.state.background_height}}>
                <div id='keywords'>搜尋關鍵字：{this.state.keywords}</div>
                <div id='single-dic-container'>
                    <h2 id='single-dic-title' className='dic-title'>{this.state.chineseName}</h2>
                    <BriefWord key={this.state.dic} dic={this.state.dic} words={this.state.words}/>
                </div>
                <button id='to-top' onClick={this.scrollToTop.bind(this)}>回頁面頂端</button>
            </div>
        );
    }
}