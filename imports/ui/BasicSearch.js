import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../../public/stylesheets/basic.css';

class BasicSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchMethod: 'equals',
            spellingMethod: 'poj_unicode',
            spelling: '',
            hanlo_taibun_poj: '',
            hoabun: '',
            english_descriptions: '',
        };
    }

    handleSubmit(event) {
        let params = {
            searchMethod: this.state.searchMethod,
            spellingMethod: this.state.spellingMethod,
            spelling: this.state.spelling,
            hanlo_taibun_poj: this.state.hanlo_taibun_poj,
            hoabun: this.state.hoabun,
            english_descriptions: this.state.english_descriptions,
        }
        let options = {
            method: 'basic',
            params: params,
        };
        Meteor.call('search', options, (error, allResults) => {
            if (error) throw new Meteor.Error(error);
            for (let idx in allResults) {
                if (allResults[idx].words.length === 0)
                    delete allResults[idx];
            }

            let state = {
                allResults: allResults,
                options: options,
            };
            this.props.history.push('all', state);
        });
        event.preventDefault();
    }

    handleInput(event) {
        let key = event.target.name;
        let value = event.target.value;
        let state = [];
        state[key] = value;
        this.setState(state);
    }

    render() {
        return (
            <div>
                <img id='banner' src='images/kv@2x.png' width='802' height='280'></img>
                <div id='form-background'>
                    <form id='basic-form' onSubmit={this.handleSubmit.bind(this)}>
                        <div id='search-title'>基礎搜尋</div>
                        <div id='form-container'>
                            <div id='search-method-container'>
                                <span>1-請選擇</span>
                                <label id='radio-1' class='radio'>
                                    <div className={this.state.searchMethod === 'equals' ? 'checked' : 'unchecked'}></div>
                                    <input type="radio" name="searchMethod" value="equals" defaultChecked={this.state.searchMethod === 'equals'} onChange={this.handleInput.bind(this)} />
                                    <span>精確搜尋</span>
                                </label>
                                <label id='radio-2' class='radio'>
                                    <div className={this.state.searchMethod === 'contains' ? 'checked' : 'unchecked'}></div>
                                    <input type="radio" name="searchMethod" value="contains" defaultChecked={this.state.searchMethod === 'contains'} onChange={this.handleInput.bind(this)} />
                                    <span>模糊搜尋</span>
                                </label>
                                <div id='wildcard-note-container'>
                                    <a id='wildcard-note' href='#'>萬用字元搜尋說明</a>
                                </div>
                            </div>
                            <div id='seperator'></div>
                            <div id='input-container'>
                                <div id='large-input'>
                                    <label className='input-title' htmlFor='spelling'>2-輸入方式 羅馬字台文</label>
                                    <div id='large-input-container'>
                                        <div id='large-input-top'>
                                            <label id='radio-3' class='radio'>
                                                <div className={this.state.spellingMethod === 'poj_unicode' ? 'checked' : 'unchecked'}></div>
                                                <input type="radio" name="spellingMethod" value="poj_unicode" defaultChecked={this.state.spellingMethod === 'poj_unicode'} onChange={this.handleInput.bind(this)} />
                                                <span>白話字</span>
                                            </label>
                                            <label id='radio-4' class='radio'>
                                                <div className={this.state.spellingMethod === 'poj_input' ? 'checked' : 'unchecked'}></div>
                                                <input type="radio" name="spellingMethod" value="poj_input" defaultChecked={this.state.spellingMethod === 'poj_input'} onChange={this.handleInput.bind(this)} />
                                                <span>白話字輸入</span>
                                            </label>
                                            <label id='radio-5' class='radio'>
                                                <div className={this.state.spellingMethod === 'kiplmj_unicode' ? 'checked' : 'unchecked'}></div>
                                                <input type="radio" name="spellingMethod" value="kiplmj_unicode" defaultChecked={this.state.spellingMethod === 'kiplmj_unicode'} onChange={this.handleInput.bind(this)} />
                                                <span>教育部羅馬字</span>
                                            </label>
                                            <label id='radio-6' class='radio'>
                                                <div className={this.state.spellingMethod === 'kiplmj_input' ? 'checked' : 'unchecked'}></div>
                                                <input type="radio" name="spellingMethod" value="kiplmj_input" defaultChecked={this.state.spellingMethod === 'kiplmj_input'} onChange={this.handleInput.bind(this)} />
                                                <span>教育部羅馬字輸入</span>
                                            </label>
                                            <div id='text-input-seperator'></div>
                                        </div>
                                        <input className='text-input' type="text" name="spelling" placeholder="輸入關鍵字" value={this.state.spelling} onChange={this.handleInput.bind(this)} />
                                    </div>
                                </div>
                                
                                <div className='small-input'>
                                    <label className='input-title' htmlFor="hanlo_taibun_poj">對應台文</label>
                                    <input className='text-input' type="text" name="hanlo_taibun_poj" placeholder="輸入關鍵字" value={this.state.hanlo_taibun_poj} onChange={this.handleInput.bind(this)} />
                                </div>
                                <div className='small-input'>
                                    <label className='input-title' htmlFor="hoabun">對應華文</label>
                                    <input className='text-input' type="text" name="hoabun" placeholder="輸入關鍵字" value={this.state.hoabun} onChange={this.handleInput.bind(this)} />
                                </div>
                                <div className='small-input'>
                                    <label className='input-title' htmlFor="english_descriptions">對應英文</label>
                                    <input className='text-input' type="text" name="english_descriptions" placeholder="輸入關鍵字" value={this.state.english_descriptions} onChange={this.handleInput.bind(this)} />
                                </div>
                            </div>
                            <input id='find-button' type="submit" value="開始找" />
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(BasicSearch);