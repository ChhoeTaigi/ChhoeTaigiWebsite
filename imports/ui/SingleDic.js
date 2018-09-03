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
        
        state.background_height = window.innerHeight - 120;
        this.state = state;
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                background_height: window.innerHeight - 120,
            });
        });
    }

    render() {
        let dic = this.state.options.dic;
        let params = this.state.options.params;
        let keywords = [];
        for (let key in params) {
            let param = params[key].replace(/\s/g, '');
            if (param !== '') {
                keywords.push(param)
            }
        }
        keywords = keywords.join('，');
        let dataLen = this.state.allResults.words.length;
        let chineseName = dicStruct.filter(struct => struct.name===dic)[0].chineseName;
        return (
            <div style={{minHeight: this.state.background_height}}>
                <div id='keywords'>搜尋關鍵字：{keywords}</div>
                <div id='result-num'>檢索結果：共{dataLen}筆</div>
                <a id={dic}></a>
                <h2 id='dic-name'>{chineseName}</h2>
                <div id='single-dic-result-container'>
                    {this.state.allResults.words.map((word) => {
                        return <Word key={word.id} dic={dic} columns={word} more={true} />; 
                    })}
                </div>
            </div>
        );
    }
}