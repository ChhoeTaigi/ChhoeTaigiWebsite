import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Explanation extends Component {
    render() {
        return (
            <div id='explanation-container'>
                <h1 id='explanation-title'>搜尋功能說明</h1>
                <div id='explanation-sec-1'>
                    <h2 className='explanation-subtitle'>搜尋方式</h2>
                    <ul>
                        <li className='explanation-li'>精確搜尋：搜尋符合關鍵字且完全相同的資料</li>
                        <li className='explanation-li'>模糊搜尋：搜尋有包含關鍵字的資料</li>
                    </ul>
                </div>
                <div id='explanation-sec-2'>
                    <h2 className='explanation-subtitle'>搜尋條件</h2>
                    <ul>
                        <li className='explanation-li'>羅馬字台文：
                            <table className='explanation-table'>
                                <tbody>
                                    <tr>
                                        <th>白話字</th>
                                        <td></td>
                                        <td>白話字Unicode格式，以台語輸入法直接輸入</td>
                                    </tr>
                                    <tr>
                                        <th>白話字輸入</th>
                                        <td></td>
                                        <td>白話字數字調號格式，適合沒有台語輸入法時使用。聲調數字放在最後(第1、4聲不用加數字)，白話字「o͘ 」以「oo」代替、鼻音「ⁿ」以「nn」代替。例如查「chho͘」改為輸入【chhoo】、查「siâⁿ」改為輸入【siann5】</td>
                                    </tr>
                                    <tr>
                                        <th>教育部羅馬字</th>
                                        <td></td>
                                        <td>教育部羅馬字Unicode格式，以台語輸入法直接輸入</td>
                                    </tr>
                                    <tr>
                                        <th>教育部羅馬字輸入</th>
                                        <td></td>
                                        <td>教育部羅馬字數字調號格式，適合沒有台語輸入法時使用。聲調數字放在最後（第1、4聲不用加數字）。例如查「pe̍h」改為輸入【peh8】</td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                        <li className='explanation-li'>漢羅台文：輸入漢字或是漢羅合用的台語文</li>
                        <li className='explanation-li'>對應華文：輸入對應台語的華語漢字</li>
                        <li className='explanation-li'>對應英文：輸入對應台語的英文</li>
                    </ul>
                </div>
                <div id='explanation-sec-3'>
                    <h2 className='explanation-subtitle'>萬用字元搜尋</h2>
                    <h3 className='explanation-subtitle2'>「 * 」： 代表0或1個以上的任意字元。</h3>
                    <span className='explanation-content'>例如輸入「白話字」關鍵字查【*pn̄g】，可以找到「âng-tāu-pn̄g」、「be̍h-á-pn̄g」、「chhài-pn̄g」、「pn̄g」等等。</span>
                    <h3 className='explanation-subtitle2'>「 + 」： 代表1個任意字元。</h3>
                    <span className='explanation-content'>例如輸入「白話字」關鍵字查「p+」，可以找到「pa」、「pá」等等。輸入「對應華文」關鍵字查「豬++」，可以找到「豬蹄子」、「豬血湯」等等。</span>
                </div>
                <div id='explanation-note'>以上說明若不夠完善，或是使用上有疑問，歡迎跟我們聯絡，謝謝。</div>
            </div>
        );
    }
}

export default withRouter(Explanation);