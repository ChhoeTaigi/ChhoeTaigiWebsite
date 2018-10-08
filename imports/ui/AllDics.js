import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import resultsTranslations from '../translations/results.json';
import dicStruct from '../api/dictionary_struct';
import BriefWord from './BriefWord';

class AllDics extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(resultsTranslations);

        let state = props.location.state;
        if (!state) {
            props.history.replace('/');
        }
        for (let idx in state.allResults) {
            if (state.allResults[idx].words.length === 0)
                delete state.allResults[idx];
        }
        this.refs = {};

        let firstDic = state.allResults.find(e => e);;
        if (firstDic)
            state.selectedDic = firstDic.dic;
        state.background_height = window.innerHeight - 154;
        this.state = state;

        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    handleScroll() {
        const sticky = document.getElementById('all-dic-buttons-background');
        let isSticky;
        if (sticky.offsetTop > 141)
            isSticky = true;
        else
            isSticky = false;
        this.setState({
            isSticky: isSticky,
        });
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 154,
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    showMore(dic) {
        let options = this.state.options;
        options.params.dic = dic;
        Meteor.call('search', options, (error, results) => {
            if (error) throw new Meteor.Error(error);
            let state = {
                options: options,
                allResults: results,
            }
            this.props.history.push('single/1', state);
        });
    }

    handleButtonClicked(dic, event) {
        const domNode = ReactDOM.findDOMNode(this.refs[dic].current);
        window.scrollTo(0, domNode.offsetTop - 125);

        this.setState({
            selectedDic: dic,
        });

        event.preventDefault();
    }

    render() {
        const params = this.state.options.params;
        const columns = params.columns;
        let keywords = [];
        if (columns !== undefined) {
            for (let key in columns) {
                let column = columns[key].replace(/\s/g, '');
                if (column !== '') {
                    keywords.push(column)
                }
            }
            keywords = keywords.join('，');
        } else {
            keywords = params.value;
        }
        
        const dicLen = this.state.allResults.filter(e => e).length;

        const allResults = this.state.allResults;
        let dicButtons = [];
        let dicBriefs = [];
        let refs = {};
        let totalNum = 0;
        for (let idx in allResults) {
            const dicResults = allResults[idx];
            const dic = dicResults.dic;
            const chineseName = dicStruct.filter((e) => e.name === dic)[0].chineseName;
            const rowNum = parseInt(allResults[idx].num);

            dicButtons.push(
                <a className={'all-dic-button ' + (this.state.selectedDic === dic ? 'all-dic-button-selected' : 'all-dic-button-unselected')} key={dic} onClick={this.handleButtonClicked.bind(this, dic)}>
                    <div><span>{(parseInt(idx) + 1) + '. ' + chineseName}</span></div>
                </a>
            )

            let thisRef = React.createRef();
            refs[dic] = thisRef;
            dicBriefs.push(
                <DictionaryBrief ref={thisRef} key={dic} dicResults={dicResults} showMore={this.showMore.bind(this, dic)} showMoreButton={rowNum > 20} />
            );

            totalNum += rowNum;
        }
        this.refs = refs;
        let remainingButtonNum = (9 - (allResults.filter(e => e).length % 9)) % 9;
        for (let i = 0; i < remainingButtonNum; ++i) {
            dicButtons.push(
                <span className='all-dic-empty' key={'empty' + i}></span>
            );
        }
        
        return (
            <div id='all-dic-container' style={{minHeight: this.state.background_height + 'px'}}>
                <div id='all-dic-keywords'><Translate id='keyowrd' />：{keywords}</div>
                <div id='all-dic-result-num'><Translate id='all-result-1' />{dicLen}<Translate id='all-result-2' />{totalNum}<Translate id='all-result-3' /></div>
                <div id='all-dic-buttons-background' style={this.state.isSticky ? {boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)'} : {}}>
                    <div id='all-dic-buttons-container'>
                        {dicButtons}
                    </div>
                </div>
                <div id='brief-result-container'>
                    {dicBriefs}
                </div>
            </div>
        );
    }
}

export default withLocalize(withRouter(AllDics));

class DictionaryBrief extends Component {
    constructor(props) {
        super(props);

        let dic = props.dicResults.dic;
        const struct = dicStruct.filter(struct => struct.name===dic)[0];
        const chineseName = struct.chineseName;
        const totalNum = props.dicResults.num;
        const words = props.dicResults.words;

        this.state = {
            dic: dic,
            chineseName: chineseName,
            totalNum: totalNum,
            words: words,
        };
    }
    showMore() {
        this.props.showMore();
    }

    render() {
        return (
            <div className='dic-container'>
                <h1 className='dic-title' id='all-dic-title'>{this.state.chineseName}</h1>
                <h2 className='dic-subtitle'>(<Translate id='result-1' />{this.state.totalNum}<Translate id='result-2' />)</h2>
                <div className='dic-content-container'>
                    <BriefWord key={this.state.dic} dic={this.state.dic} words={this.state.words} width960 />
                    {this.props.showMoreButton ? <button className='show-more-button' onClick={this.showMore.bind(this)}><Translate id='mroe-results' /></button> : ''}
                </div>
            </div>
        );
    }
}
