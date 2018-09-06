import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

import dicStruct from '../api/dictionary_struct';
import Word from "./Word";

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

        let firstDic = state.allResults.find(e => e).dic;
        if (firstDic)
            state.selectedDic = firstDic;
        this.state = state;
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
        window.scrollTo(0, domNode.offsetTop - 130);

        this.setState({
            selectedDic: dic,
        });

        event.preventDefault();
    }

    render() {
        let params = this.state.options.params;
        let keywords = [];
        for (let key in params) {
            let param = params[key].replace(/\s/g, '');
            if (param !== '') {
                keywords.push(param)
            }
        }
        keywords = keywords.join('，');

        let dicLen = this.state.allResults.filter(e => e).length;

        let allResults = this.state.allResults;
        let dicButtons = [];
        let dicBriefs = [];
        let refs = {};
        for (let idx in allResults) {
            let dicResults = allResults[idx];
            let dic = dicResults.dic;
            let chineseName = dicStruct.filter((e) => e.name === dic)[0].chineseName;
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
            <div>
                <div id='all-dic-keywords'>搜尋關鍵字：{keywords}</div>
                <div id='all-dic-result-num'>檢索結果：共{dicLen}本</div>
                <div id='all-dic-buttons-background'>
                    <div id='all-dic-buttons-container'>
                        {dicButtons}
                    </div>
                </div>
                
                <div>
                    {dicBriefs}
                </div>
            </div>
        );
    }
}

export default withRouter(AllDics);

class DictionaryBrief extends Component {
    showMore() {
        this.props.showMore();
    }

    render() {
        let dicResults = this.props.dicResults;
        let dic = dicResults.dic;
        let chineseName = dicStruct.filter(struct => struct.name===dic)[0].chineseName;
        return (
            <div>
                <a id={dic}></a>
                <h2 className='all-dic-title'>{chineseName}</h2>
                <div className='all-dic-results-container'>
                    {dicResults.words.map((word) => {
                        return <Word key={word.id} dic={dic} columns={word} more={true} />
                    })}
                </div>
                {this.props.showMoreButton ? <button className='show-more-button' onClick={this.showMore.bind(this)}>更多</button> : ''}
            </div>
        );
    }
}
