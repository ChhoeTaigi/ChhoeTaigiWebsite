import React, { Component } from 'react';

import originalScannedCopy from '../../../api/utils/original-scanned-copy';

export default class Word extends Component {
    constructor(props) {
        super(props);
    }

    generateGoanChhehLink = (dicString, chhehMia, pageString) => {
        let linkHtml = []

        if (dicString === 'ChhoeTaigiSukhoo_TaijitToaSutian') {
            let pages = pageString.split("/");
            if (pages.length <= 1) {
                linkHtml.push(<a href={originalScannedCopy(dicString, chhehMia, pageString)} target='_blank' key={pageString}>{pageString}</a>);
            } else {
                for (var i = 0; i < pages.length; i++) {
                    linkHtml.push(<a href={originalScannedCopy(dicString, chhehMia, pages[i])} target='_blank' key={pages[i]}>{pages[i]}</a>);

                    if (i != pages.length - 1) {
                        linkHtml.push(", ");
                    }
                }
            }
        } else if (dicString === 'ChhoeTaigiSukhoo_TaijitSinSusu') {
            let pages = pageString.split("/");
            if (pages.length <= 1) {
                linkHtml.push(<a href={originalScannedCopy(dicString, chhehMia, pageString)} target='_blank' key={pageString}>{pageString}</a>);
            } else {
                for (var i = 0; i < pages.length; i++) {
                    linkHtml.push(<a href={originalScannedCopy(dicString, chhehMia, pages[i])} target='_blank' key={pages[i]}>{pages[i]}</a>);

                    if (i != pages.length - 1) {
                        linkHtml.push(", ");
                    }
                }
            }
        } else if (dicString === 'ChhoeTaigiSukhoo_Sekin_Choapun_TJTaigiPehoe' || 
            (dicString === 'ChhoeTaigiSukhoo_Sekin_BunhakTuchok' && (chhehMia.startsWith('《鄉史補記》') || chhehMia.startsWith('《陳明仁台語文學選》')))) {
            linkHtml = pageString + "（本冊kan-na提供索引資料，nā有需要請ka-tī買冊。請支持台文出版品，感謝！）";
        } else {
            linkHtml.push(<a href={originalScannedCopy(dicString, chhehMia, pageString)} target='_blank'>{pageString}</a>);
        }

        return linkHtml
    }

    generateStoreLink = (dicString) => {
        let linkHtml = []

        if (dicString === 'ChhoeTaigiSukhoo_Sekin_Choapun_TJTaigiPehoe') {
            linkHtml.push(<a href='https://www.pcstore.com.tw/haiang/M19279123.htm' target='_blank'>亞細亞國際傳播社：TJ台語白話小詞典</a>);
        } else {
            linkHtml.push("");
        }

        return linkHtml
    }

    generateBunhakTuchokStoreLink = (tuchokMia) => {
        let linkHtml = [];

        if (tuchokMia.startsWith('《鄉史補記》')) {
            const bangchi = 'http://www.taiouan.com.tw/catalog/product_info.php?products_id=3282'
            linkHtml.push(<a href={bangchi} target='_blank'>{bangchi}</a>);
        } else if (tuchokMia.startsWith('《陳明仁台語文學選》')) {
            const bangchi = 'http://www.taiouan.com.tw/catalog/product_info.php?products_id=1583'
            linkHtml.push(<a href={bangchi} target='_blank'>{bangchi}</a>);
        }

        return linkHtml
    }

    generateWebsiteLink = (dicString, pageString) => {
        let linkHtml = []

        if (dicString === 'ChhoeTaigiSukhoo_TaihoaSoanntengSutian') {
            const fullPageString = "http://ip194097.ntcu.edu.tw/q/THq.asp?w=" + pageString
            linkHtml.push(<a href={fullPageString} target='_blank'>{fullPageString}</a>);
        } else if (dicString === 'ChhoeTaigiSukhoo_KipPlus') {
            const fullPageString = "https://sutian.moe.edu.tw/und-hani/tshiau/?lui=tai_su&tsha=" + pageString
            linkHtml.push(<a href={fullPageString} target='_blank'>{fullPageString}</a>);
        } else if (dicString === 'ChhoeTaigiSukhoo_iTaigi') {
            const fullPageString = "https://itaigi.tw/k/" + pageString
            linkHtml.push(<a href={fullPageString} target='_blank'>{fullPageString}</a>);
        } else {
            linkHtml.push(<a href={pageString} target='_blank'>{pageString}</a>);
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
            
            if (key === '掀原冊(頁)') {
                content = this.generateGoanChhehLink(this.props.dic, columns['冊名'], columns[key]);
            } else if (key === '來去買冊') {
                if (this.props.dic === 'ChhoeTaigiSukhoo_Sekin_BunhakTuchok') {
                    const chhehMia = columns['冊名'];
                    console.log("來去買冊: " + chhehMia);
                    if (chhehMia.startsWith('《鄉史補記》') ||
                        chhehMia.startsWith('《陳明仁台語文學選》')) {
                        content = this.generateBunhakTuchokStoreLink(chhehMia);
                    }
                } else {
                    content = this.generateStoreLink(this.props.dic);
                }
            } else if (key === '網址') {
                if (this.props.dic === 'ChhoeTaigiSukhoo_TaihoaSoanntengSutian') {
                    content = this.generateWebsiteLink(this.props.dic, columns['對應華文']);
                } else if (this.props.dic === 'ChhoeTaigiSukhoo_KipPlus') {
                    content = this.generateWebsiteLink(this.props.dic, columns['白話字']);
                } else if (this.props.dic === 'ChhoeTaigiSukhoo_iTaigi') {
                    content = this.generateWebsiteLink(this.props.dic, columns['對應華文']);
                } else {
                    content = this.generateWebsiteLink(this.props.dic, columns[key]);
                }
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
            <table className='word-detail-table'>
                <tbody>
                    {contents}
                </tbody>
            </table>
        );
    }
}