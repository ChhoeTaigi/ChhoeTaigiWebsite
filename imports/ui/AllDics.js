import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DicStruct from '../api/dictionary_struct';
import Word from "./Word";
import '../../public/stylesheets/dic.css';

class AllDics extends Component {
    constructor(props) {
        super(props);

        let state = props.location.state;
        if (!state) {
            props.history.replace('/');
        }
        
        this.state = state;
    }

    showMore(dic) {
        Meteor.call('search.single.all', this.params, dic, (error, results) => {
            if (error) throw new Meteor.Error(error);

            this.props.history.push('/', this.state);
            
            this.setState({
                results: results,
            });
        });
    }

    render() {
        let allResults = this.state.allResults;
        let dicButtons = [];
        for (let idx in allResults) {
            let dic = allResults[idx].dic;
            let chineseName = DicStruct.filter((e) => e.name === dic)[0].chineseName;
            dicButtons.push(
                <a key={dic} href={'#' + dic}>{chineseName}</a>
            )
        }

        return (
            <div>
                <div id='dicButtonsContainer'>
                    {dicButtons}
                </div>
                <div>
                    {allResults.map((dicResults) => {
                        return <DictionaryBrief key={dicResults.dic} dicResults={dicResults} showMore={this.showMore.bind(this, dicResults.dic)} showMoreButton={allResults.length > 1} />
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
                <h2>{chineseName}</h2>
                <ol>
                    {dicResults.words.map((word) => {
                        return <Word key={word.id} dic={dic} columns={word} />
                    })}
                </ol>
                {this.props.showMoreButton ? <button onClick={this.showMore.bind(this)}>更多</button> : ''}
            </div>
        );
    }
}
