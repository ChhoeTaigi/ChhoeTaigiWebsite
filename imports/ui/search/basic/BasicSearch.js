import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ReactGA from 'react-ga';
import { stringify } from '../../../api/utils/url-helper';
import basicTranslations from '../../../translations/basic.json';

let state = {
    searchMethod: 'equals',
    spellingMethod: 'poj_input',
    spelling: '',
    taibun: '',
    hoabun: '',
    english: '',
    background_height: window.innerHeight - 360,
};

class BasicSearch extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(basicTranslations);

        this.state = state;

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 360,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        window.scrollTo(0, 0)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        state = this.state;
    }

    handleSubmit(event) {
        ReactGA.event({
            category: 'user',
            action: 'search',
            label: 'basic'
        });

        const options = {
            method: 'basic',
            searchMethod: this.state.searchMethod,
            spellingMethod: this.state.spellingMethod,
            columns: {
                spelling: this.state.spelling,
                taibun: this.state.taibun,
                hoabun: this.state.hoabun,
                english: this.state.english,
            },
        }

        this.props.history.push({
            pathname: 'search', 
            search: stringify(options),
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

    resetAllInput = () => { 
        this.setState({
            spelling: "",
            taibun: "",
            hoabun: "",
            english: ""
        });
    }

    render() {
        return (
            <div>
                <div id='banner-container'>
                    <img id='banner' src='images/home_image@2x.png' width='730' height='200'></img>
                </div>
                <div id='form-background'  style={{minHeight: this.state.background_height + 'px'}}>
                    <form id='basic-form' onSubmit={this.handleSubmit.bind(this)} autoComplete='off'>
                        <div id='search-title'><Translate id="basic" /></div>
                        <div id='form-container'>
                            <div id='search-method-container'>
                                <span id='search-method-text-container'><Translate id="search-method" /></span>
                                <label id='radio-1' className='radio'>
                                    <div className={this.state.searchMethod === 'equals' ? 'checked' : 'unchecked'}></div>
                                    <input type="radio" name="searchMethod" value="equals" defaultChecked={this.state.searchMethod === 'equals'} onChange={this.handleInput.bind(this)} />
                                    <span><Translate id="equals" /></span>
                                </label>
                                <label id='radio-2' className='radio'>
                                    <div className={this.state.searchMethod === 'contains' ? 'checked' : 'unchecked'}></div>
                                    <input type="radio" name="searchMethod" value="contains" defaultChecked={this.state.searchMethod === 'contains'} onChange={this.handleInput.bind(this)} />
                                    <span><Translate id="contains" /></span>
                                </label>
                                <div id='regex-note-container'>
                                    <Link id='regex-note' to='/annachhoe'><Translate id="explanation" /></Link>
                                </div>
                            </div>
                            <div id='seperator'></div>
                            <div id='input-method'><Translate id="input-method" /></div>
                            <div id='input-container'>
                                <div id='input-container-left'>
                                    <label className='input-title' htmlFor='spelling'><Translate id="lmj-tb" /></label>
                                    <span className='text-height'></span>
                                    <label className='input-title top-space' htmlFor="taibun"><Translate id="corresponding-tb" /></label>
                                    <label className='input-title top-space' htmlFor="hoabun"><Translate id="corresponding-hb" /></label>
                                    <label className='input-title top-space' htmlFor="english"><Translate id="corresponding-en" /></label>
                                </div>
                                <div id='input-container-right'>
                                    <div id='large-input-top'>
                                        <label id='radio-3' className='radio'>
                                            <div className={this.state.spellingMethod === 'poj_input' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="poj_input" defaultChecked={this.state.spellingMethod === 'poj_input'} onChange={this.handleInput.bind(this)} />
                                            <span><Translate id="poj-input" /></span>
                                        </label>
                                        <label id='radio-4' className='radio'>
                                            <div className={this.state.spellingMethod === 'kip_input' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="kip_input" defaultChecked={this.state.spellingMethod === 'kip_input'} onChange={this.handleInput.bind(this)} />
                                            <span><Translate id="lmj-input" /></span>
                                        </label>
                                        <label id='radio-5' className='radio'>
                                            <div className={this.state.spellingMethod === 'poj_unicode' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="poj_unicode" defaultChecked={this.state.spellingMethod === 'poj_unicode'} onChange={this.handleInput.bind(this)} />
                                            <span><Translate id="poj" /></span>
                                        </label>
                                        <label id='radio-6' className='radio'>
                                            <div className={this.state.spellingMethod === 'kip_unicode' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="kip_unicode" defaultChecked={this.state.spellingMethod === 'kip_unicode'} onChange={this.handleInput.bind(this)} />
                                            <span><Translate id="lmj" /></span>
                                        </label>
                                        <div id='text-input-seperator'></div>
                                    </div>
                                    <Translate>{({ translate }) =>
                                        <div>
                                            <input className='text-input-lomaji' type="text" name="spelling" placeholder={translate('keyword')} value={this.state.spelling} onChange={this.handleInput.bind(this)} />
                                            <input className='text-input top-space' type="text" name="taibun" placeholder={translate('keyword')} value={this.state.taibun} onChange={this.handleInput.bind(this)} />
                                            <input className='text-input top-space' type="text" name="hoabun" placeholder={translate('keyword_suggest_fuzzy')} value={this.state.hoabun} onChange={this.handleInput.bind(this)} />
                                            <input className='text-input top-space' type="text" name="english" placeholder={translate('keyword_suggest_fuzzy')} value={this.state.english} onChange={this.handleInput.bind(this)} />
                                        </div>
                                    }</Translate>
                                </div>
                            </div>
                            <Translate>{({ translate }) =>
                                <div className="search_actions">
                                    <div className="search_actions_search_button"><input className='find-button' style={{marginTop: '12px', marginBottom: '20px'}} type="submit" value={translate('find')} /></div>
                                    <div className="search_actions_clear_button"><input className='clear-button' style={{marginTop: '12px', marginBottom: '20px'}} type="button" value={translate('reset')} onClick={this.resetAllInput} /></div>
                                </div>
                            }</Translate>
                            <div className="support_taibun_kesimi">
                                <label className="support_taibun_kesimi_part1_label"><Translate id="support_taibun_kesimi_part1" /></label>
                                <a className="support_taibun_kesimi_part2_a" target="_blank" href="https://www.zeczec.com/projects/taibun-kesimi"><Translate id="support_taibun_kesimi_part2" /></a>
                                <label className="support_taibun_kesimi_part3_label"><Translate id="support_taibun_kesimi_part3" /></label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withLocalize(withRouter(BasicSearch));
