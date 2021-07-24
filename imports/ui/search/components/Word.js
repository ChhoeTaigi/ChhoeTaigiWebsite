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
        } else if (dicString === 'TJTaigiPehoeSioSutian') {
            linkHtml = pageString + "（本冊kan-na提供索引資料，nā有需要請ka-tī買冊，支持台文出版品，感謝！）";
        } else {
            linkHtml.push(<a href={originalScannedCopy(dicString, pageString)} target='_blank'>{pageString}</a>);
        }

        return linkHtml
    }

    generateStoreLink = (dicString) => {
        let linkHtml = []

        if (dicString === 'TJTaigiPehoeSioSutian') {
            linkHtml.push(<a href='https://www.pcstore.com.tw/haiang/M19279123.htm' target='_blank'>亞細亞國際傳播社：TJ台語白話小詞典</a>);
        } else {
            linkHtml.push("");
        }

        return linkHtml
    }

    generateWebsiteLink = (dicString, pageString) => {
        let linkHtml = []

        if (dicString === 'SoanntengMuitheSekin') {
            linkHtml.push(<a href={pageString} target='_blank'>{pageString}</a>);
        } else {
            linkHtml.push("");
        }

        return linkHtml
    }

    generateGoanchhehPoochhoingChuliauWebsiteLink = (dicString) => {
        let linkHtml = []

        if (dicString === 'TaijitToaSutian') {
            linkHtml.push(
                <ul>
                    <li><a href='https://chhoetaigi.github.io/TaijitToaSutianWebsite/pdf/%E5%8F%B0%E6%97%A5%E5%A4%A7%E8%BE%AD%E5%85%B8%E8%AA%AA%E6%98%8E%E2%80%94%E2%80%94%E5%8F%B0%E7%81%A3%E8%AA%9E%C3%AA%E7%99%BC%E9%9F%B3%2020210724.pdf' target='_blank'>台灣語ê發音</a></li>
                    <li><a href='https://chhoetaigi.github.io/TaijitToaSutianWebsite/pdf/%E5%8F%B0%E6%97%A5%E5%A4%A7%E8%BE%AD%E5%85%B8%E8%AA%AA%E6%98%8E%E2%80%94%E2%80%94%E5%87%A1%E4%BE%8B%2020210724.pdf' target='_blank'>凡例</a></li>
                    <li><a href='https://chhoetaigi.github.io/TaijitToaSutianWebsite/pdf/%E5%8F%B0%E6%97%A5%E5%A4%A7%E8%BE%AD%E5%85%B8%E8%AA%AA%E6%98%8E%E2%80%94%E2%80%94%E3%80%8C%E5%8F%B0%E7%81%A3%E8%AA%9E%E4%BB%AE%E5%90%8D-%E7%99%BD%E8%A9%B1%E5%AD%97%E3%80%8D%E5%B0%8D%E7%85%A7%E8%A1%A8%2020210505.pdf' target='_blank'>「台灣語仮名-白話字」對照表</a></li>
                    <li><a href='https://chhoetaigi.github.io/TaijitToaSutianWebsite/pdf/%E5%8F%B0%E6%97%A5%E5%A4%A7%E8%BE%AD%E5%85%B8%E8%AA%AA%E6%98%8E%E2%80%94%E2%80%94%E3%80%8C%E7%99%BD%E8%A9%B1%E5%AD%97-%E5%8F%B0%E7%81%A3%E8%AA%9E%E4%BB%AE%E5%90%8D%E3%80%8D%E5%B0%8D%E7%85%A7%E8%A1%A8%2020210505.pdf' target='_blank'>「白話字-台灣語仮名」對照表</a></li>
                </ul>
            );
        } else {
            linkHtml.push("");
        }

        return linkHtml
    }

    render() {
        console.log("render word");
        const columns = this.props.columns;
        const contents = [];
        for (let key in columns) {
            console.log("render column: " + key);
            let content;
            if (key === '原冊頁數') {
                content = this.generateGoanChhehLink(this.props.dic, columns[key]);
            } else if (key === '來去買冊') {
                content = this.generateStoreLink(this.props.dic);
            } else if (key === '媒體網址') {
                content = this.generateWebsiteLink(this.props.dic, columns[key]);
            } else if (key === '原冊補充資料') {
                content = this.generateGoanchhehPoochhoingChuliauWebsiteLink(this.props.dic);
            } else {
                content = columns[key];
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