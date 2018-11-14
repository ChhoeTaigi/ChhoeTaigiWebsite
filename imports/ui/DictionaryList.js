import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import { stringify } from '../api/utils/url-helper';
import resultsTranslations from '../translations/results.json';
import dicStruct from '../api/dicts/dictionary-struct';
import BriefWord from './BriefWord';

class DictionaryList extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(resultsTranslations);
        
        this.state = {
            background_height: window.innerHeight - 154,
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.allResults && props.allResults.filter(e => (e.words.length !== 0)).length > 0) {
            const firstDic = props.allResults.find(e => (e.words.length !== 0)).dic;
            this.setState({
                selectedDic: firstDic,
            });
        }
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

    handleButtonClicked(dic, event) {
        const domNode = ReactDOM.findDOMNode(this.refs[dic].current);
        window.scrollTo(0, domNode.offsetTop - 125);

        this.setState({
            selectedDic: dic,
        });

        event.preventDefault();
    }

    render() {
        let keywords = [];
        let dicButtons = [];
        let dicBriefs = [];
        let dicLen = 0;
        let totalNum = 0;
        if (this.props.allResults) {
            const options = this.props.options;
            const columns = options.columns;
            
            if (columns !== undefined) {
                // all dics
                for (let key in columns) {
                    if (columns[key]) {
                        let column = columns[key].replace(/\s/g, '');
                        if (column !== '') {
                            keywords.push(column)
                        }
                    }
                }
                keywords = keywords.join('，');
            } else if (options.value) {
                // all fields
                keywords = options.value;
            }

            dicLen = this.props.allResults.filter(e => (e.words.length > 0)).length;
    
            const allResults = this.props.allResults;
            
            let refs = {};
            for (let idx in allResults) {
                const dicResults = allResults[idx];
                if (dicResults.words.length !== 0) {
                    const dic = dicResults.dic;
                    const chineseName = dicStruct.find((e) => e.name === dic).chineseName;
                    const rowNum = parseInt(allResults[idx].num);
        
                    dicButtons.push(
                        <a className={'all-dic-button ' + (this.state.selectedDic === dic ? 'all-dic-button-selected' : 'all-dic-button-unselected')} key={dic} onClick={this.handleButtonClicked.bind(this, dic)}>
                            <div><span>{(parseInt(idx) + 1) + '. ' + chineseName}</span></div>
                        </a>
                    )
        
                    let thisRef = React.createRef();
                    refs[dic] = thisRef;
                    dicBriefs.push(
                        <DictionaryBrief ref={thisRef} key={dic} dicResults={dicResults} options={this.props.options} showMoreButton={rowNum > 20} />
                    );
        
                    totalNum += rowNum;
                }
            }
            this.refs = refs;
            let remainingButtonNum = (9 - (allResults.filter(e => e).length % 9)) % 9;
            for (let i = 0; i < remainingButtonNum; ++i) {
                dicButtons.push(
                    <span className='all-dic-empty' key={'empty' + i}></span>
                );
            }
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

export default withLocalize(withRouter(DictionaryList));

class DictionaryBrief extends Component {
    constructor(props) {
        super(props);

        let dic = props.dicResults.dic;
        const struct = dicStruct.find(e => e.name === dic);
        const chineseName = struct.chineseName;
        const totalNum = props.dicResults.num;
        const words = props.dicResults.words;
        const options = Object.assign({}, props.options);
        options.dic = dic;
        const url = '/search?' + stringify(options);

        this.state = {
            dic: dic,
            chineseName: chineseName,
            totalNum: totalNum,
            words: words,
            url: url,
        };
    }

    render() {
        return (
            <div className='dic-container'>
                <h1 className='dic-title' id='all-dic-title'>{this.state.chineseName}</h1>
                <h2 className='dic-subtitle'>(<Translate id='result-1' />{this.state.totalNum}<Translate id='result-2' />)</h2>
                <div className='dic-content-container'>
                    <BriefWord key={this.state.dic} dic={this.state.dic} words={this.state.words} width960 />
                    {this.props.showMoreButton ? <Link className='show-more-button' to={this.state.url}><Translate id='mroe-results' /></Link> : ''}
                </div>
            </div>
        );
    }
}
