import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import dicStruct from '../api/dictionary_struct';

class AdvancedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: 'allFields',
            selectedDic: undefined,
        };
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
            <button key='allField' onClick={this.handleMethodButton.bind(this, 'allField')}>全文搜尋</button>,
            <button key='singleDic' onClick={this.handleMethodButton.bind(this, 'singleDic')}>依辭典搜尋</button>
        ];

        // dictionary buttons
        let dicButtons = [];
        if (this.state.method === 'singleDic') {
            for (let idx in dicStruct) {
                let dic = dicStruct[idx].name;
                dicButtons.push(
                    <button key={dic} onClick={this.handleDicButton.bind(this, dic)}>{dicStruct[idx].chineseName}</button>
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
            <div>
                <div>{methodButtons}</div>
                <div>{dicButtons}</div>
                <div>{searchOptions}</div>
            </div>
        );
    }

    updateResults(state) {
        if (Array.isArray(state))
            this.props.history.push('all', state);
        else
            this.props.history.push('single', state);
    }
}

export default withRouter(AdvancedSearch);

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
        let params = this.state.params;
        let options = {
            method: 'singleDic',
            dic: this.props.dic,
            params: params,
        };
        Meteor.call('search', options, (error, result) => {
            if (error) throw new Meteor.Error(error);
            this.props.updateResults(result);
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
        let inputs = [];
        
        for (let key in columns) {
            inputs.push(
                <div key={key}>
                    <label>
                        {columns[key]}
                        <input type='text' placeholder='輸入關鍵字' onChange={this.handleInput.bind(this, key)} value={this.state.params[key]}></input>
                    </label>
                    <br />
                </div>
            )
        }
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {inputs}
                <input type="submit" value="開始找" />
            </form>
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
        let options = {
            method: 'allField',
            value: this.state.value,
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
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type='text' placeholder='輸入關鍵字' onChange={this.handleInput.bind(this)} value={this.state.value}></input>
                <br />
                <input type="submit" value="開始找" />
            </form>
        );
    }
}