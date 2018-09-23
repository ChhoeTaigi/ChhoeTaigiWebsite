import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import dicStruct from '../api/dictionary_struct';
import BriefWord from './BriefWord';

class AllDics extends Component {
    constructor(props) {
        super(props);
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
        state.background_height = window.innerHeight - 12;
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
            background_height: window.innerHeight - 120,
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }

    showMore(dic) {
        let options = this.state.options;
        options.dic = dic;
        Meteor.call('search', options, (error, results) => {
            if (error) throw new Meteor.Error(error);
            let state = {
                options: options,
                allResults: results,
            }
            this.props.history.push('single', state);
        });
    }

    handleButtonClicked(dic, event) {
        const domNode = ReactDOM.findDOMNode(this.refs[dic].current);
        window.scrollTo(0, domNode.offsetTop - 135);

        this.setState({
            selectedDic: dic,
        });

        event.preventDefault();
    }

    render() {
        const params = this.state.options.params;
        let keywords = [];
        if (params) {
            for (let key in params) {
                let param = params[key].replace(/\s/g, '');
                if (param !== '' && key !== 'searchMethod' && key !== 'spellingMethod') {
                    keywords.push(param)
                }
            }
            keywords = keywords.join('，');
        } else {
            keywords = this.state.options.value;
        }
        
        const dicLen = this.state.allResults.filter(e => e).length;

        const allResults = this.state.allResults;
        let dicButtons = [];
        let dicBriefs = [];
        let refs = {};
        for (let idx in allResults) {
            const dicResults = allResults[idx];
            const dic = dicResults.dic;
            const chineseName = dicStruct.filter((e) => e.name === dic)[0].chineseName;
            dicButtons.push(
                <a className={'all-dic-button ' + (this.state.selectedDic === dic ? 'all-dic-button-selected' : 'all-dic-button-unselected')} key={dic} onClick={this.handleButtonClicked.bind(this, dic)}>
                    <div><span>{(parseInt(idx) + 1) + '. ' + chineseName}</span></div>
                </a>
            )

            let thisRef = React.createRef();
            refs[dic] = thisRef;
            dicBriefs.push(
                <DictionaryBrief ref={thisRef} key={dic} dicResults={dicResults} showMore={this.showMore.bind(this, dic)} showMoreButton={dicResults.words.length > 1} />
            );
        }
        this.refs = refs;
        let remainingButtonNum = 9 - (allResults.filter(e => e).length % 9);
        for (let i = 0; i < remainingButtonNum; ++i) {
            dicButtons.push(
                <span className='all-dic-empty' key={'empty' + i}></span>
            );
        }
        
        return (
            <div style={{minHeight: this.state.background_height + 'px'}}>
                <div id='all-dic-keywords'>搜尋關鍵字：{keywords}</div>
                <div id='all-dic-result-num'>檢索結果：共{dicLen}本</div>
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

export default withRouter(AllDics);

class DictionaryBrief extends Component {
    constructor(props) {
        super(props);

        let dic = this.props.dicResults.dic;
        const struct = dicStruct.filter(struct => struct.name===dic)[0];
        const chineseName = struct.chineseName;
        const words = this.props.dicResults.words;

        this.state = {
            dic: dic,
            chineseName: chineseName,
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
                <div className='dic-content-container'>
                    <BriefWord key={this.state.dic} dic={this.state.dic} words={this.state.words} width960 />
                    {this.props.showMoreButton ? <button className='show-more-button' onClick={this.showMore.bind(this)}>顯示更多</button> : ''}
                </div>
            </div>
        );
    }
}
