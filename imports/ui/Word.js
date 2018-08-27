import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DicStruct from '../api/dictionary_struct';

export default class Word extends Component {
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
                <ul>
                    {content}
                    <li><Link to={linkUri}>更多</Link></li>
                </ul>
            </li>
        );
    }
}