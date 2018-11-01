import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ReactGA from 'react-ga';
import { stringify } from '../api/urlHelper';

import basicTranslations from '../translations/basic.json';

let state = {
    searchMethod: 'equals',
    spellingMethod: 'poj_input',
    spelling: '',
    taibun: '',
    hoabun: '',
    english_descriptions: '',
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
                english_descriptions: this.state.english_descriptions,
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
                                <span><Translate id="search-method" /></span>
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
                                <div id='wildcard-note-container'>
                                    <Link id='wildcard-note' to='/annachhoe'><Translate id="explanation" /></Link>
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
                                    <label className='input-title top-space' htmlFor="english_descriptions"><Translate id="corresponding-en" /></label>
                                </div>
                                <div id='input-container-right'>
                                    <div id='large-input-top'>
                                        <label id='radio-3' className='radio'>
                                            <div className={this.state.spellingMethod === 'poj_input' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="poj_input" defaultChecked={this.state.spellingMethod === 'poj_input'} onChange={this.handleInput.bind(this)} />
                                            <span><Translate id="poj-input" /></span>
                                        </label>
                                        <label id='radio-4' className='radio'>
                                            <div className={this.state.spellingMethod === 'kiplmj_input' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="kiplmj_input" defaultChecked={this.state.spellingMethod === 'kiplmj_input'} onChange={this.handleInput.bind(this)} />
                                            <span><Translate id="lmj-input" /></span>
                                        </label>
                                        <label id='radio-5' className='radio'>
                                            <div className={this.state.spellingMethod === 'poj_unicode' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="poj_unicode" defaultChecked={this.state.spellingMethod === 'poj_unicode'} onChange={this.handleInput.bind(this)} />
                                            <span><Translate id="poj" /></span>
                                        </label>
                                        <label id='radio-6' className='radio'>
                                            <div className={this.state.spellingMethod === 'kiplmj_unicode' ? 'checked' : 'unchecked'}></div>
                                            <input type="radio" name="spellingMethod" value="kiplmj_unicode" defaultChecked={this.state.spellingMethod === 'kiplmj_unicode'} onChange={this.handleInput.bind(this)} />
                                            <span><Translate id="lmj" /></span>
                                        </label>
                                        <div id='text-input-seperator'></div>
                                    </div>
                                    <Translate>{({ translate }) =>
                                        <div>
                                            <input className='text-input' type="text" name="spelling" placeholder={translate('keyword')} value={this.state.spelling} onChange={this.handleInput.bind(this)} />
                                            <input className='text-input top-space' type="text" name="taibun" placeholder={translate('keyword')} value={this.state.taibun} onChange={this.handleInput.bind(this)} />
                                            <input className='text-input top-space' type="text" name="hoabun" placeholder={translate('keyword')} value={this.state.hoabun} onChange={this.handleInput.bind(this)} />
                                            <input className='text-input top-space' type="text" name="english_descriptions" placeholder={translate('keyword')} value={this.state.english_descriptions} onChange={this.handleInput.bind(this)} />
                                        </div>
                                    }</Translate>
                                </div>
                            </div>
                            <Translate>{({ translate }) =>
                                <input className='find-button' style={{marginTop: '12px', marginBottom: '20px'}} type="submit" value={translate('find')} />
                            }</Translate>
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default withLocalize(withRouter(BasicSearch));
