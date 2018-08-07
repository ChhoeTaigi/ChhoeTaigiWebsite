import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import DicStruct from '../api/dictionary_struct';

export default class DictionaryBrief extends Component {
    showMore() {
        this.props.showMore();
    }

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
                {this.props.showMoreButton ? <button onClick={this.showMore.bind(this)}>更多</button> : ''}
            </div>
        );
    }
}

class WordBiref extends Component {
    render() {
        // dictionary url
        let id = this.props.columns.id;
        let dic = this.props.dic;
        const linkUri = '/' + dic + '/' + id;

        // dictionary details
        let dic_struct = DicStruct.filter(struct => struct.name===dic)[0].columns;
        let columns = this.props.columns;
        let content = [];
        for (let key in columns) {
            content.push((
                <li key={key}>{dic_struct[key]} - {columns[key]}</li>
            ));
        }
        return (
            <li>
                <Link to={linkUri}>
                    <ul>
                        {content}
                    </ul>
                </Link>
            </li>
        );
    }
}