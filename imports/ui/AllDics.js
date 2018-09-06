import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import DicStruct from '../api/dictionary_struct';
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

        if(props.location.hash !== '') {
            state.selectedDic = props.location.hash.substr(1);
        }
        else {
            let firstDic = state.allResults.find(e => e).dic;
            if (firstDic)
                state.selectedDic = firstDic;
        }
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
        for (let idx in allResults) {
            let dic = allResults[idx].dic;
            let chineseName = DicStruct.filter((e) => e.name === dic)[0].chineseName;
            let state = this.state;
            dicButtons.push(
                <HashLink className={'all-dic-button ' + (this.state.selectedDic === dic ? 'all-dic-button-selected' : 'all-dic-button-unselected')} key={dic} to={{pathname: 'all', hash: '#' + dic, state:state}}>
                    <div><span>{(parseInt(idx) + 1) + '. ' + chineseName}</span></div>
                </HashLink>
            )
        }
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
                    {allResults.map((dicResults) => {
                        return (
                            <DictionaryBrief key={dicResults.dic} dicResults={dicResults} showMore={this.showMore.bind(this, dicResults.dic)} showMoreButton={allResults.length > 1} />
                        );
                    })}
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
        let chineseName = DicStruct.filter(struct => struct.name===dic)[0].chineseName;
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
