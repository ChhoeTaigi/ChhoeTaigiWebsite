import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";

import { stringify } from '../../../api/utils/url-helper';
import resultsTranslations from '../../../translations/results.json';
import dicStruct from '../../../api/dicts/dictionary-struct';
import BriefWord from './BriefWord';

import { LoadingIndicator } from './LoadingIndicator';

class DictionaryList extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(resultsTranslations);

        this.state = {
            gotResult: false
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.allResults && props.allResults.filter(e => (e.words.length !== 0)).length > 0) {
            const firstDic = props.allResults.find(e => (e.words.length !== 0)).dic;
            this.setState({
                selectedDic: firstDic,
            });
        }

        this.setState({
            gotResult: true,
        });
    }

    handleScroll() {
        const sticky = document.getElementsByClassName('search-result__dic-list')[0];
        const stickyYPosition = parseInt(getComputedStyle(sticky).top.replace('px', ''));
        if (sticky.getBoundingClientRect().top === stickyYPosition) {
            sticky.classList.add('pinned');
        }
        else {
            sticky.classList.remove('pinned');
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleButtonClicked(dic, event) {
        const domNode = ReactDOM.findDOMNode(this.refs[dic].current);
        const topPosition = document.getElementsByClassName('site-header')[0].offsetHeight + document.getElementsByClassName('search-result__dic-list')[0].offsetHeight + 30;
        window.scrollTo(0, domNode.offsetTop - topPosition);

        this.setState({
            selectedDic: dic,
        });

        event.preventDefault();
    }

    render() {
        let DICT_COUNT = 10;

        let keywords = [];
        let resultCount = [];
        let dicButtonsRow = [];
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
                        let column = columns[key]; //.replace(/\s/g, '');
                        if (column !== '') {
                            keywords.push("【" + column + "】");
                        }
                    }
                }
                keywords = keywords.join('，');
            } else if (options.value) {
                // all fields
                keywords = "【" + options.value + "】";
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

                    dicButtonsRow.push(
                        <button className={'btn ' + (this.state.selectedDic === dic ? 'active' : '')} key={dic} onClick={this.handleButtonClicked.bind(this, dic)}>
                            {chineseName}
                        </button>
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
            if (this.state.gotResult) {
                let thisRef = React.createRef();
                resultCount.push(
                    <div key='resultCount' className='search-result__counts'><Translate id='all-result-1' />{dicLen}<Translate id='all-result-2' />{totalNum}<Translate id='all-result-3' /></div>
                )
            }
        }

        return (
            <div className='search-result search-result--list'>
                <div className='container'>
                    <div className='search-result__query'>
                        <Translate id='search_keyword' />：{keywords}
                    </div>
                    {resultCount}
                    {!this.props.allResults && LoadingIndicator}
                </div>
                <div className='search-result__dic-list'>
                    <div className='container'>
                        {dicButtonsRow}
                    </div>
                </div>
                <div className='search-result__brief'>
                    <div className='container'>
                        {dicBriefs}
                    </div>
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

    toggleDicContent(event) {
        let currentHeader = event.currentTarget;
        if (window.getComputedStyle(currentHeader).display === 'flex') {
            if (currentHeader.classList.contains('active')) {
                currentHeader.classList.remove('active');
            }
            else {
                document.querySelectorAll('.dic-block__header').forEach(function (el) {
                    el.classList.remove('active');
                });
                currentHeader.classList.add('active');
            }
        }
    }

    render() {
        return (
            <div className='dic-block'>
                <header className='dic-block__header' onClick={this.toggleDicContent}>
                    <h2 className='dic-block__title'>{this.state.chineseName}</h2>
                    <h3 className='dic-block__counts'>(<Translate id='result-1' />{this.state.totalNum}<Translate id='result-2' />)</h3>
                </header>
                <div className='dic-block__content'>
                    <BriefWord key={this.state.dic} dic={this.state.dic} words={this.state.words} />
                    {this.props.showMoreButton ? <div className='dic-block__append'><Link className='btn dic-block__more' to={this.state.url}><Translate id='more-results' /></Link></div> : ''}
                </div>
            </div>
        );
    }
}
