import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import ReactGA from "react-ga4";

import { stringify } from "../../../api/utils/url-helper";
import dicStruct from "../../../api/dicts/dictionary-struct";
import advancedTranslations from "../../../translations/advanced.json";
import { isEmpty } from "../../../api/utils/utils";

let state = {
    method: 'allField',
    selectedDic: undefined
};

class AdvancedSearch extends Component {
    constructor(props) {
        super(props);

        props.addTranslation(advancedTranslations);
        this.state = state;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
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
        });
    }

    render() {
        // method buttons
        let methodButtons = [
            <button className={this.state.method === 'allField' ? 'active' : ''} key='allField' onClick={this.handleMethodButton.bind(this, 'allField')}><Translate id='all-field' /></button>,
            <button className={this.state.method === 'singleDic' ? 'active' : ''} key='singleDic' onClick={this.handleMethodButton.bind(this, 'singleDic')}><Translate id='by-dic' /></button>
        ];

        // dictionary buttons
        let dicButtonsArr = [];
        let dicButtons;
        if (this.state.method === "singleDic") {
            for (let idx in dicStruct) {
                let dic = dicStruct[idx].name;
                dicButtonsArr.push(
                    <button className={'btn ' + (this.state.selectedDic === dic ? 'active' : '')} key={dic} onClick={this.handleDicButton.bind(this, dic)}>{dicStruct[idx].chineseName}</button>
                );
            }
            dicButtons = <div className='adv-search__dic-list'>{dicButtonsArr}</div>;
        }

        // search options
        let searchOptions;
        if (this.state.method === "singleDic") {
            let selectedDic = this.state.selectedDic;
            if (selectedDic) {
                searchOptions = (
                    <SingleDicOptions key="singleDicOptions" dic={selectedDic} />
                );
            }
        } else {
            searchOptions = <AllFieldOptions key="allFieldOptions" />;
        }

        // view
        return (
            <div className='adv-search'>
                <div className="container">
                    <div className='adv-search__tabs'>{methodButtons}</div>
                    <div className='adv-search__content'>
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
                searchMethod: "equals",
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

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        singleDicState = this.state;
    }

    clearInput(dic) {
        let dicColumns = dicStruct.find((e) => e.name === dic).columns;
        let columns = {};
        for (let key in dicColumns) {
            columns[key] = "";
        }
        return columns;
    }

    handleSubmit(event) {
        // ReactGA.event({
        //     category: "user",
        //     action: "search",
        //     label: "single-dic",
        // });

        if (this.state.searchMethod === 'equals') {
            for (let key in this.state.columns) {
                this.state.columns[key] = this.state.columns[key].trim();
            }
        }

        // normalize input to Unicode standard
        for (let key in this.state.columns) {
            this.state.columns[key] = this.state.columns[key].normalize("NFC");
        }

        let options = {
            method: "single-dic",
            dic: this.props.dic,
            searchMethod: this.state.searchMethod,
            columns: this.state.columns,
        };

        this.props.history.push({
            pathname: "search",
            search: stringify(options),
        });

        event.preventDefault();
    }

    handleInput(event) {
        let key = event.target.name;

        let value = event.target.value;
        if (key === "searchMethod") {
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

    resetAllInput = () => {
        this.setState({
            columns: this.clearInput(this.props.dic),
        });
    };

    donateButtonClick = () => {
        window.open("https://r.zecz.ec/oiML", '_blank').focus();
    }

    render() {
        let dic = this.props.dic;
        let columns = dicStruct.find((e) => e.name === dic).columns;

        let searchBlocks = [];
        for (let key in columns) {
            if (key !== "StoreLink") {
                searchBlocks.push(
                    <div className='search-block'>
                        <label className='search-block__left' key={key + '-label'} htmlFor={key}>{columns[key]}</label>
                        <div className='search-block__right'>
                            <Translate key={key + '-input'}>{({ translate }) =>
                                <input type='text' placeholder={translate('keyword')} name={key} onChange={this.handleInput.bind(this)} value={this.state.columns[key]}></input>
                            }</Translate>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div className='single-dic-search'>
                <form onSubmit={this.handleSubmit.bind(this)} autoComplete='off'>
                    <div className='single-dic-search__top'>
                        <div className='single-dic-search__mode'>
                            <label className='single-dic-search__mode-title' key='search-method-label'><Translate id='search-method' /></label>
                            <label className='radio-simulated'>
                                <input type="radio" className='radio-simulated__hidden' name="searchMethod" value="equals" defaultChecked={this.state.searchMethod === 'equals'} onChange={this.handleInput.bind(this)} />
                                <span className='radio-simulated__text'><Translate id="equals" /></span>
                            </label>
                            <label className='radio-simulated'>
                                <input type="radio" className='radio-simulated__hidden' name="searchMethod" value="contains" defaultChecked={this.state.searchMethod === 'contains'} onChange={this.handleInput.bind(this)} />
                                <span className='radio-simulated__text'><Translate id="contains" /></span>
                            </label>
                        </div>
                        <div className='single-dic-search__note'>
                            <Link id='regex-note' to='/annachhoe'><Translate id="explanation" /></Link>
                        </div>
                    </div>
                    {searchBlocks}
                    <Translate>{({ translate }) =>
                        <div className="search-actions single-dic-search__actions">
                            <input className='btn btn--search' type="submit" value={translate('find')} />
                            <input className='btn btn--clear' type="button" value={translate('reset')} onClick={this.resetAllInput} />
                            <input className='btn btn--donate' type="button" value={translate('donate')} onClick={this.donateButtonClick} />
                        </div>
                    }</Translate>
                </form>
            </div>
        );
    }
}

const SingleDicOptions = withRouter(SingleDicOptionsClass);

let allFieldState = {
    searchMethod: "equals",
    value: "",
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
        // ReactGA.event({
        //     category: "user",
        //     action: "search",
        //     label: "all-field",
        // });

        if (this.state.searchMethod === 'equals') {
            this.state.value = this.state.value.trim();
        }

        // normalize input to Unicode standard
        this.state.value = this.state.value.normalize("NFC");

        let options = {
            method: "all-field",
            searchMethod: this.state.searchMethod,
            value: this.state.value,
        };

        this.props.history.push({
            pathname: "search",
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
            value: "",
        });
    };

    render() {
        return (
            <Translate>{({ translate }) =>
                <form className='all-field-search' onSubmit={this.handleSubmit.bind(this)} autoComplete='off'>
                    <div className='all-field-search__top'>
                        <div className='all-field-search__mode'>
                            <h3><Translate id="search-method" /></h3>
                            <label className='radio-simulated'>
                                <input type="radio" className='radio-simulated__hidden' name="searchMethod" value="equals" defaultChecked={this.state.searchMethod === 'equals'} onChange={this.handleInput.bind(this)} />
                                <span className='radio-simulated__text'><Translate id="equals" /></span>
                            </label>
                            <label className='radio-simulated'>
                                <input type="radio" className='radio-simulated__hidden' name="searchMethod" value="contains" defaultChecked={this.state.searchMethod === 'contains'} onChange={this.handleInput.bind(this)} />
                                <span className='radio-simulated__text'><Translate id="contains" /></span>
                            </label>
                        </div>
                        <div className='all-field-search__note'>
                            <Link to='/annachhoe'><Translate id="explanation" /></Link>
                        </div>
                    </div>
                    <input className='all-field-search__input' type='text' placeholder={translate('keyword')} name='value' onChange={this.handleInput.bind(this)} value={this.state.value}></input>
                    <div className="all-field-search__actions search-actions">
                        <input className='btn btn--search' type="submit" value={translate('find')} />
                        <input className='btn btn--clear' type="button" value={translate('reset')} onClick={this.resetAllInput} />
                        <input className='btn btn--donate' type="button" value={translate('donate')} onClick={this.donateButtonClick} />
                    </div>
                </form>
            }</Translate>
        );
    }
}

const AllFieldOptions = withRouter(AllFieldOptionsClass);
