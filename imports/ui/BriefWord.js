import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Word extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // dictionary url
        let id = this.props.id;
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
        let link = <tr><td className='detail' colSpan='2'></td></tr>;
        return (
            <div className='brief-word-container'>
                <table className='brief-word'>
                    <tbody>
                        {content}
                        {link}
                    </tbody>
                </table>
                <Link className='breif-show-more' to={linkUri}>
                    <span>看詳細</span>
                    <img src='images/detail_arrow@2x.png' width='15' height='15'></img>
                </Link>
            </div>
        );
    }
}