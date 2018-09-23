import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import dicStruct from '../api/dictionary_struct';

export default class Word extends Component {
    constructor(props) {
        super(props);

        let dic = props.dic;
        let struct = dicStruct.filter(e => e.name === dic)[0];
        let headerTitle = struct.brief;
        let columnWidth = struct.briefWidth;
        this.state = {
            headerTitle: headerTitle,
            columnWidth: columnWidth,
        };
    }

    render() {
        // header
        let headerTitle = this.state.headerTitle;
        let header = [];
        for (let key in headerTitle) {
            header.push(<th key={key}>{headerTitle[key]}</th>);
        }
        header.push(<th key='detail' className='detail-td'></th>);

        // rows
        let columnWidth = this.state.columnWidth;
        let dic = this.props.dic;
        let words = this.props.words;
        let rows = []
        for (let idx in words) {
            let word = words[idx];
            let row = [];
            for (let key in word) {
                if (key in headerTitle)
                    row.push(<td key={key + idx} style={{width: columnWidth[key]}}>{word[key]}</td>);
            }
            const linkUri = '/' + dic + '/' + word.id;
            row.push(<td key={'detail' + idx} className='detail-td'><Link to={linkUri}>詳細</Link></td>)
            rows.push(<tr className='content-row' key={idx}>{row}</tr>);
        }

        return (
            <table className={'brief-word ' + (this.props.width960 ? 'brief-word-960' : '')}>
                <tbody>
                    <tr className='header-row'>{header}</tr>
                    {rows}
                </tbody>
            </table>
        );
    }
}