import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

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
            background_height: window.innerHeight - 404,
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 404,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleSubmit(event) {
        ReactGA.event({
            category: 'user',
            action: 'search',
            label: 'basic'
        });

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
                <div id='form-background' style={{minHeight: this.state.background_height + 'px'}}>
                    <form id='basic-form' onSubmit={this.handleSubmit.bind(this)}>
                        <div id='search-title'>基礎搜尋</div>
                        <div id='form-container'>
                            <div id='search-method-container'>
                                <span>1-請選擇</span>
                                <label id='radio-1' className='radio'>
                                    <div className={this.state.searchMethod === 'equals' ? 'checked' : 'unchecked'}></div>
                                    <input type="radio" name="searchMethod" value="equals" defaultChecked={this.state.searchMethod === 'equals'} onChange={this.handleInput.bind(this)} />
                                    <span>精確搜尋</span>
                                </label>
                                <label id='radio-2' className='radio'>
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
                                <div id='input-container-left'>
                                    <label className='input-title' htmlFor='spelling'>2-輸入方式 羅馬字台文</label>
                                    <span className='text-height'></span>
                                    <label className='input-title top-space' htmlFor="hanlo_taibun_poj">對應台文</label>
                                    <label className='input-title top-space' htmlFor="hoabun">對應華文</label>
                                    <label className='input-title top-space' htmlFor="english_descriptions">對應英文</label>
                                </div>
                                <div id='input-container-right'>
                                    <div id='large-input-top'>
                                        <label id='radio-3' className='radio'>
                                            <div className={this.state.spellingMethod === 'poj_unicode' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="poj_unicode" defaultChecked={this.state.spellingMethod === 'poj_unicode'} onChange={this.handleInput.bind(this)} />
                                            <span>白話字</span>
                                        </label>
                                        <label id='radio-4' className='radio'>
                                            <div className={this.state.spellingMethod === 'poj_input' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="poj_input" defaultChecked={this.state.spellingMethod === 'poj_input'} onChange={this.handleInput.bind(this)} />
                                            <span>白話字輸入</span>
                                        </label>
                                        <label id='radio-5' className='radio'>
                                            <div className={this.state.spellingMethod === 'kiplmj_unicode' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="kiplmj_unicode" defaultChecked={this.state.spellingMethod === 'kiplmj_unicode'} onChange={this.handleInput.bind(this)} />
                                            <span>教育部羅馬字</span>
                                        </label>
                                        <label id='radio-6' className='radio'>
                                            <div className={this.state.spellingMethod === 'kiplmj_input' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="kiplmj_input" defaultChecked={this.state.spellingMethod === 'kiplmj_input'} onChange={this.handleInput.bind(this)} />
                                            <span>教育部羅馬字輸入</span>
                                        </label>
                                        <div id='text-input-seperator'></div>
                                    </div>
                                    <input className='text-input' type="text" name="spelling" placeholder="輸入關鍵字" value={this.state.spelling} onChange={this.handleInput.bind(this)} />
                                    <input className='text-input top-space' type="text" name="hanlo_taibun_poj" placeholder="輸入關鍵字" value={this.state.hanlo_taibun_poj} onChange={this.handleInput.bind(this)} />
                                    <input className='text-input top-space' type="text" name="hoabun" placeholder="輸入關鍵字" value={this.state.hoabun} onChange={this.handleInput.bind(this)} />
                                    <input className='text-input top-space' type="text" name="english_descriptions" placeholder="輸入關鍵字" value={this.state.english_descriptions} onChange={this.handleInput.bind(this)} />
                                </div>
                            </div>
                            <input className='find-button' style={{marginTop: '22px'}} type="submit" value="開始找" />
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(BasicSearch);