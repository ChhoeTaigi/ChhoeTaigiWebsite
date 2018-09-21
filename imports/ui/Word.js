import React, { Component } from 'react';

export default class Word extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let columns = this.props.columns;
        let content = [];
        for (let key in columns) {
            content.push(
                <tr key={key}>
                    <th>{key}</th>
                    <td>{columns[key]}</td>
                </tr>
            );
        }
        return (
            <table className='detail-word'>
                <tbody>
                    {content}
                </tbody>
            </table>
        );
    }
}