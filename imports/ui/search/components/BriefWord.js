import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from "react-localize-redux";

import dicStruct from '../../../api/dicts/dictionary-struct';

export default class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const words = this.props.words;

        if (words === undefined || words.length === 0)
            return <div></div>;
        else {
            const dic = this.props.dic;
            const struct = dicStruct.find(e => e.name === dic);
            // header
            const headerTitle = struct.brief;
            const header = [];
            for (let key in headerTitle) {
                header.push(<th key={key}>{headerTitle[key]}</th>);
            }
            header.push(<th key='detail' className='detail-td'></th>);

            // rows
            const columnWidth = struct.briefWidth;
            const rows = []
            for (let idx in words) {
                const word = words[idx];
                const row = [];
                for (let key in word) {
                    if (key in headerTitle)
                        row.push(<td key={key + idx} style={{width: columnWidth[key]}}>{word[key]}</td>);
                }
                const linkUri = '/' + dic + '/' + word.DictWordID;
                row.push(<td key={'detail' + idx} className='detail-td'><Link to={linkUri}><Translate id='more' /></Link></td>)
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
}