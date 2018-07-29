import React, { Component } from 'react';

export default class ResultRow extends Component {
    render() {
        let columns = this.props.columns;
        let result = this.props.result;
        let content = [];
        for (let key in columns) {
            content.push(
                <li key={key}><b>{columns[key]}</b>: {result[key]}</li>
            );
        }
        return (
            <div>
                <ul>
                    {content}
                </ul>
            </div>
        );
    }
}