import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class DicApp extends Component {
    render() {
        return (
            <div id='dic-app-container'>
                <h1 id='dic-app-title'>ChhoeTaigi 台語辭典APP</h1>
                <span id='dic-app-content'>「ChhoeTaigi 台語辭典App」讓你可以把台語辭典安裝在手機上，隨身帶著走，走到哪隨時查到哪，查詢時也不需要網路連線，而且搜尋速度更快！是你學習台語、台語文的最佳好夥伴！</span>
                <div id='dic-link-group'>
                    <div id='dic-link-1'>
                        <span>iOS版</span>
                        <img src='images/iOS_QR@2x.png' width='100' height='100'></img>
                        <img src='images/iOS@2x.png' width='136' height='50'></img>
                    </div>
                    <div  id='dic-link-2'>
                        <span>Android版</span>
                        <img src='images/android@2x.png' width='110' height='110'></img>
                        <span>正在規劃開發時程敬請支持贊助！</span>
                    </div>
                </div>
                <img id='dic-app-img' src='images/app_pic@2x.png' width='622' height='428'></img>
            </div>
        );
    }
}

export default withRouter(DicApp);