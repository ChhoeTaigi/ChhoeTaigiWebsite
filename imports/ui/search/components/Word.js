import React, { Component } from 'react';

import originalScannedCopy from '../../../api/utils/original-scanned-copy';

export default class Word extends Component {
    constructor(props) {
        super(props);
    }

    generateGoanChhehLink = (dicString, pageString) => {
        let linkHtml = []

        if (dicString === 'TaijitToaSutian') {
            let pages = pageString.split("/");
            if (pages.length <= 1) {
                linkHtml.push(<a href={originalScannedCopy(dicString, pageString)} target='_blank' key={pageString}>{pageString}</a>);
            } else {
                for (var i = 0; i < pages.length; i++) {
                    linkHtml.push(<a href={originalScannedCopy(dicString, pages[i])} target='_blank' key={pages[i]}>{pages[i]}</a>);

                    if (i != pages.length - 1) {
                        linkHtml.push(", ");
                    }
                }
            }
        } else if (dicString === 'TJTaigiPehoeSiosutian') {
            linkHtml = pageString + "（本冊kan-na提供索引資料，nā有需要請ka-tī買冊，支持台文出版品，感謝！）";
        } else {
            linkHtml.push(<a href={originalScannedCopy(dicString, pageString)} target='_blank'>{pageString}</a>);
        }

        return linkHtml
    }

    generateStoreLink = (dicString) => {
        let linkHtml = []

        if (dicString === 'TJTaigiPehoeSiosutian') {
            linkHtml.push(<a href='https://www.pcstore.com.tw/haiang/M19279123.htm' target='_blank'>亞細亞國際傳播社：TJ台語白話小詞典</a>);
        } else {
            linkHtml.push("");
        }

        return linkHtml
    }

    render() {
        const columns = this.props.columns;
        const contents = [];
        for (let key in columns) {
            let content;
            if (key === '原冊頁數') {
                content = this.generateGoanChhehLink(this.props.dic, columns[key])
            } else {
                content = columns[key];
            }

            if (key === '來去買冊') {
                content = this.generateStoreLink(this.props.dic)
            }

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