import React, { Component } from 'react';

import originalScannedCopy from '../api/utils/original-scanned-copy';

export default class Word extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = this.props.columns;
        const contents = [];
        for (let key in columns) {
            let content;
            if (key === '原冊頁數')
                content = <a href={originalScannedCopy(this.props.dic, columns[key])} target='_blank'>{columns[key]}</a>;
            else
                content = columns[key];   
                contents.push(
                <tr key={key}>
                    <th>{key}</th>
                    <td>{content}</td>
                </tr>
            );
        }
        return (
            <table className='detail-word'>
                <tbody>
                    {contents}
                </tbody>
            </table>
        );
    }
}