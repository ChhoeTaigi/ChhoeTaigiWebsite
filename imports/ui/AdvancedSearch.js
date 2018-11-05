import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ReactGA from 'react-ga';

import { stringify } from '../api/urlHelper';
import dicStruct from '../api/dictionary_struct';
import advancedTranslations from '../translations/advanced.json';
import { isEmpty } from '../api/utilities';

let state = {
    method: 'allField',
    selectedDic: undefined,
    background_height: window.innerHeight - 154,
};

class AdvancedSearch extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(advancedTranslations);

        this.state = state;

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 154,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        state = this.state;
    }

    handleMethodButton(method) {
        this.setState({
            method: method,
            selectedDic: dicStruct[0].name,
        });
    }

    handleDicButton(dic) {
        this.setState({
            selectedDic: dic,
            results: undefined,
        })
    }

    render() {
        // method buttons
        let methodButtons = [
            <button className={'method-button ' + (this.state.method === 'allField' ? 'method-button-selected' : 'method-button-unselected')} key='allField' onClick={this.handleMethodButton.bind(this, 'allField')}><Translate id='all-field' /></button>,
            <button className={'method-button ' + (this.state.method === 'singleDic' ? 'method-button-selected' : 'method-button-unselected')} key='singleDic' onClick={this.handleMethodButton.bind(this, 'singleDic')}><Translate id='by-dic' /></button>
        ];

        // dictionary buttons
        let dicButtonsArr = [];
        let dicButtons;
        if (this.state.method === 'singleDic') {
            for (let idx in dicStruct) {
                let dic = dicStruct[idx].name;
                dicButtonsArr.push(
                    <button className={'dic-button ' + (this.state.selectedDic === dic ? 'dic-button-selected' : 'dic-button-unselected')} key={dic} onClick={this.handleDicButton.bind(this, dic)}>{(parseInt(idx) + 1) + '. ' + dicStruct[idx].chineseName}</button>
                );
            }
            dicButtons = <div id='dic-buttons-container'>{dicButtonsArr}</div>;
        }

        // search options
        let searchOptions;
        if (this.state.method === 'singleDic') {
            let selectedDic = this.state.selectedDic;
            if (selectedDic) {
                searchOptions = <SingleDicOptions key='singleDicOptions' dic={selectedDic} />;
            }
        } else {
            searchOptions = <AllFieldOptions key='allFieldOptions' />;
        }

        // view
        return (
            <div className='green-background' style={{minHeight: this.state.background_height + 'px'}}>
                <div id='advanced-container'>
                    <div id='method-buttons-container'>{methodButtons}</div>
                    <div id='option-container'>
                        {dicButtons}
                        {searchOptions}
                    </div>
                </div>
            </div>
        );
    }
}

export default withLocalize(withRouter(AdvancedSearch));

let singleDicState = {};

class SingleDicOptionsClass extends Component {
    constructor(props) {
        super(props);
        if (isEmpty(singleDicState)) {
            this.state = {
                columns: this.clearInput(this.props.dic),
                searchMethod: 'equals',
            };
        } else {
            this.state = singleDicState;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.dic !== nextProps.dic) {
            let columns = this.clearInput(nextProps.dic);
            nextState.columns = columns;
        }
    }

    componentWillUnmount() {
        singleDicState = this.state;
    }

    clearInput(dic) {
        let dicColumns = dicStruct.find((e) => e.name === dic).columns;
        let columns = {};
        for (let key in dicColumns) {
            columns[key] = '';
        }
        return columns;
    }

    handleSubmit(event) {
        ReactGA.event({
            category: 'user',
            action: 'search',
            label: 'single-dic'
        });

        let options = {
            method: 'single-dic',
            dic: this.props.dic,
            searchMethod: this.state.searchMethod,
            columns: this.state.columns,
        };
        
        this.props.history.push({
            pathname: 'search', 
            search: stringify(options),
        });

        event.preventDefault();
    }

    handleInput(event) {
        let key = event.target.name;
        let value = event.target.value;
        if (key === 'searchMethod') {
            this.setState({
                searchMethod: value,
            });
        } else {
            let columns = this.state.columns;
            columns[key] = value;
            this.setState({
                columns: columns,
            });
        }
    }

    render() {
        let dic = this.props.dic;
        let columns = dicStruct.find((e) => e.name === dic).columns;
        let labels = [
            <label key='search-method-label' className='single-dic-label' id='search-method'><Translate id='search-method' /></label>
        ];
        for (let key in columns) {
            labels.push(
                <label className='single-dic-label' key={key + '-label'} htmlFor={key}>{columns[key]}</label>
            );
        }

        let inputs = [
            <div key='search-method-radio' id='single-dic-search-method-container'>
                <label className='radio'>
                    <div className={this.state.searchMethod === 'equals' ? 'checked' : 'unchecked'}></div>
                    <input type="radio" name="searchMethod" value="equals" defaultChecked={this.state.searchMethod === 'equals'} onChange={this.handleInput.bind(this)} />
                    <span><Translate id="equals" /></span>
                </label>
                <label id='single-dic-radio-2' className='radio'>
                    <div className={this.state.searchMethod === 'contains' ? 'checked' : 'unchecked'}></div>
                    <input type="radio" name="searchMethod" value="contains" defaultChecked={this.state.searchMethod === 'contains'} onChange={this.handleInput.bind(this)} />
                    <span><Translate id="contains" /></span>
                </label>
                <div id='single-dic-wildcard-note-container'>
                    <Link id='wildcard-note' to='/annachhoe'><Translate id="explanation" /></Link>
                </div>
            </div>
        ];
        for (let key in columns) {
            inputs.push(
                <Translate key={key + '-input'}>{({ translate }) =>
                    <input className='single-dic-text-input' type='text' placeholder={translate('keyword')} name={key} onChange={this.handleInput.bind(this)} value={this.state.columns[key]}></input>
                }</Translate>
            )
        }
        return (
            <div id='single-dic-form-container'>
                <form id='single-dic-form' onSubmit={this.handleSubmit.bind(this)} autoComplete='off'>
                    <div>
                        <div id='labels-container'>
                            {labels}
                        </div>
                        <div id='inputs-container'>
                            {inputs}
                        </div>
                    </div>
                    <Translate>{({ translate }) =>
                        <input className='find-button' type="submit" value={translate('find')} style={{marginTop: '15px'}} />
                    }</Translate>
                </form>
            </div>
            
        );
    }
}

const SingleDicOptions = withRouter(SingleDicOptionsClass);


let allFieldState = {
    searchMethod: 'equals',
    value: '',
};

class AllFieldOptionsClass extends Component {
    constructor(props) {
        super(props);
        this.state = allFieldState;
    }

    componentWillUnmount() {
        allFieldState = this.state;
    }

    handleSubmit(event) {
        ReactGA.event({
            category: 'user',
            action: 'search',
            label: 'all-field'
        });

        let options = {
            method: 'all-field',
            searchMethod: this.state.searchMethod,
            value: this.state.value,
        };
        
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
            <Translate>{({ translate }) =>
                <form id='all-field-form' onSubmit={this.handleSubmit.bind(this)} autoComplete='off'>
                    <div id='all-field-search-method-container'>
                        <span><Translate id="search-method" /></span>
                        <label id='all-field-radio-1' className='radio'>
                            <div className={this.state.searchMethod === 'equals' ? 'checked' : 'unchecked'}></div>
                            <input type="radio" name="searchMethod" value="equals" defaultChecked={this.state.searchMethod === 'equals'} onChange={this.handleInput.bind(this)} />
                            <span><Translate id="equals" /></span>
                        </label>
                        <label id='all-field-radio-2' className='radio'>
                            <div className={this.state.searchMethod === 'contains' ? 'checked' : 'unchecked'}></div>
                            <input type="radio" name="searchMethod" value="contains" defaultChecked={this.state.searchMethod === 'contains'} onChange={this.handleInput.bind(this)} />
                            <span><Translate id="contains" /></span>
                        </label>
                        <div id='all-field-wildcard-note-container'>
                            <Link id='wildcard-note' to='/annachhoe'><Translate id="explanation" /></Link>
                        </div>
                    </div>
                    <input className='all-field-text-input' type='text' placeholder={translate('keyword')} name='value' onChange={this.handleInput.bind(this)} value={this.state.value}></input>
                    <input className='find-button' style={{marginTop: '30px'}} type="submit" value={translate('find')} />
                    <div id='bg-img'></div>
                </form>
            }</Translate>
        );
    }
}

const AllFieldOptions = withRouter(AllFieldOptionsClass);