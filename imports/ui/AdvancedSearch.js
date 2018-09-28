import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ReactGA from 'react-ga';

import dicStruct from '../api/dictionary_struct';
import advancedTranslations from '../translations/advanced.json';

class AdvancedSearch extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(advancedTranslations);

        this.state = {
            method: 'allField',
            selectedDic: undefined,
            background_height: window.innerHeight - 96,
        };

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 96,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
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
        let dicButtons = [];
        if (this.state.method === 'singleDic') {
            for (let idx in dicStruct) {
                let dic = dicStruct[idx].name;
                dicButtons.push(
                    <button className={'dic-button ' + (this.state.selectedDic === dic ? 'dic-button-selected' : 'dic-button-unselected')} key={dic} onClick={this.handleDicButton.bind(this, dic)}>{(parseInt(idx) + 1) + '. ' + dicStruct[idx].chineseName}</button>
                );
            }
        }

        // search options
        let searchOptions;
        if (this.state.method === 'singleDic') {
            let selectedDic = this.state.selectedDic;
            if (selectedDic) {
                searchOptions = <SingleDicOptions key='singleDicOptions' dic={selectedDic} updateResults={this.updateResults.bind(this)} />;
            }
        } else {
            searchOptions = <AllFieldOptions key='allFieldOptions' updateResults={this.updateResults.bind(this)} />;
        }

        // view
        return (
            <div className='green-background' style={{minHeight: this.state.background_height + 'px'}}>
                <div id='advanced-container'>
                    <div id='method-buttons-container'>{methodButtons}</div>
                    <div id='option-container'>
                        <div id='dic-buttons-container'>{dicButtons}</div>
                        {searchOptions}
                    </div>
                </div>
            </div>
        );
    }

    updateResults(state) {
        if (state.options.method === 'singleDic')
            this.props.history.push('/single/1', state);
        else if (state.options.method === 'allField')
            this.props.history.push('/all', state);
    }
}

export default withLocalize(withRouter(AdvancedSearch));

class SingleDicOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: this.clearInput(this.props.dic),
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.dic !== nextProps.dic)
            nextState.params = this.clearInput(nextProps.dic);
    }

    clearInput(dic) {
        let columns = dicStruct.filter((e) => e.name === dic)[0].columns;
        let params = {};
        for (let key in columns) {
            params[key] = '';
        }
        return params;
    }

    handleSubmit(event) {
        ReactGA.event({
            category: 'user',
            action: 'search',
            label: 'single-dic'
        });

        let params = this.state.params;
        let options = {
            method: 'singleDic',
            dic: this.props.dic,
            params: params,
        };
        Meteor.call('search', options, (error, results) => {
            if (error) throw new Meteor.Error(error);
            let state = {
                options: options,
                allResults: results,
            }
            this.props.updateResults(state);
        });
        event.preventDefault();
    }

    handleInput(key, event) {
        let params = this.state.params;
        params[key] = event.target.value;
        this.setState({
            params: params,
        });
    }

    render() {
        let dic = this.props.dic;
        let columns = dicStruct.filter((e) => e.name === dic)[0].columns;
        let labels = [];
        for (let key in columns) {
            labels.push(
                <label className='single-dic-label' key={key + '-label'} htmlFor={key}>{columns[key]}</label>
            );
        }

        let inputs = [];
        for (let key in columns) {
            inputs.push(
                <input className='singl-dic-text-input' key={key + '-input'} type='text' placeholder='輸入關鍵字' name={key} onChange={this.handleInput.bind(this, key)} value={this.state.params[key]}></input>
            )
        }
        return (
            <div id='single-dic-form-container'>
                <form id='single-dic-form' onSubmit={this.handleSubmit.bind(this)}>
                    <div id='labels-container'>
                        {labels}
                    </div>
                    <div id='inputs-container'>
                    {inputs}
                    </div>
                    <input className='find-button' type="submit" value="開始找" style={{marginTop: '15px'}} />
                </form>
            </div>
            
        );
    }
}

class AllFieldOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    handleSubmit(event) {
        ReactGA.event({
            category: 'user',
            action: 'search',
            label: 'all-field'
        });

        let options = {
            method: 'allField',
            params: {
                value: this.state.value,
            }
        };
        Meteor.call('search', options, (error, results) => {
            if (error) throw new Meteor.Error(error);
            let state = {
                options: options,
                allResults: results,
            }
            this.props.updateResults(state);
        });
        event.preventDefault();
    }

    handleInput(event) {
        this.setState({
            value: event.target.value,
        });
    }

    render() {
        return (
            <Translate>{({ translate }) =>
                <form id='all-field-form' onSubmit={this.handleSubmit.bind(this)}>
                    <input className='all-field-text-input' type='text' placeholder={translate('keyword')} onChange={this.handleInput.bind(this)} value={this.state.value}></input>
                    <input className='find-button' style={{marginTop: '30px'}} type="submit" value={translate('find')} />
                    <div id='bg-img'></div>
                </form>
            }</Translate>
        );
    }
}