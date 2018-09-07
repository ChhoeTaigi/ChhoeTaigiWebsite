import React, { Component } from 'react';

import dicStruct from '../api/dictionary_struct';
import Word from "./Word";

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
        const dataLen = state.allResults.words.length;
        const struct = dicStruct.filter(struct => struct.name===dic)[0];
        const chineseName = struct.chineseName;
        const columnName = struct.brief;

        const newWords = [];
        state.allResults.words.map((word) => {
            const id = word.id;
            for (let key in word) {
                word[columnName[key]] = word[key];
                delete word[key];
            }
            newWords.push({
                id: id,
                columns: word,
            })
        })

        this.state = {
            dic: dic,
            keywords: keywords,
            dataLen: dataLen,
            chineseName: chineseName,
            words: newWords,
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

    render() {
        return (
            <div style={{minHeight: this.state.background_height}}>
                <div id='keywords'>搜尋關鍵字：{this.state.keywords}</div>
                <div id='result-num'>檢索結果：共{this.state.dataLen}筆</div>
                <a id={this.state.dic}></a>
                <h2 id='dic-name'>{this.state.chineseName}</h2>
                <div id='single-dic-result-container'>
                    {this.state.words.map((word) => {
                        const id = word.id;
                        return <Word key={id} dic={this.state.dic} id={id} columns={word.columns} more={true} />; 
                    })}
                </div>
            </div>
        );
    }
}