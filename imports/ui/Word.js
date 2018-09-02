import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Word extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // dictionary url
        let id = this.props.columns.id;
        let dic = this.props.dic;
        const linkUri = '/' + dic + '/' + id;

        // dictionary details
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
        let link;
        if (this.props.more)
            link = <tr><td><Link to={linkUri}>更多</Link></td></tr>;
        return (
            <table>
                <tbody>
                    {content}
                    {link}
                </tbody>
            </table>
        );
    }
}