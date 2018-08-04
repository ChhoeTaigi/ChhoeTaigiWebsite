import React, { Component } from 'react';
import DicStruct from '../api/dictionary_struct';

export default class DictionaryBrief extends Component {
    render() {
        let dic = this.props.list.dic;
        let chineseName = DicStruct.filter(struct => struct.name===dic)[0].chineseName;
        return (
            <div>
                <h2>{chineseName}</h2>
                <ol>
                    {this.props.list.lists.map((list) => {
                        return <WordBiref key={list.id} dic={dic} columns={list} />
                    })}
                </ol>
            </div>
        );
    }
}

class WordBiref extends Component {
    render() {
        let dic_struct = DicStruct.filter(struct => struct.name===this.props.dic)[0].columns;
        let columns = this.props.columns;
        let id = columns.id;
        let content = [];
        for (let key in columns) {
            content.push((
                <li key={key}>{dic_struct[key]} - {columns[key]}</li>
            ));
        }
        return (
            <li>
                <ul>
                    {content}
                </ul>
            </li>
        );
    }
}