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

        // result
        let resultView = undefined;
        let results = this.state.results;
        if (results) {
            let chineseName = dicStruct.filter(e => e.name === results.dic)[0].chineseName;
            resultView = (
                <div>
                    <h2>{chineseName}</h2>
                    <ol>{results.lists.map(e => <Word key={e.id} dic={results.dic} columns={e} />)}</ol>
                </div>
            );
        }

        // view
        return (
            <div>
                <div>{methodButtons}</div>
                <div>{dicButtons}</div>
                <div>{searchOptions}</div>
                {resultView}
            </div>
        );
    }

    updateResults(state) {
        this.props.history.push('all', state);
    }
}

export default withRouter(AdvancedSearch);

class SingleDicOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.clearInput(this.props.dic),
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.dic !== nextProps.dic)
            nextState.options = this.clearInput(nextProps.dic);
    }

    clearInput(dic) {
        let columns = dicStruct.filter((e) => e.name === dic)[0].columns;
        let options = {};
        for (let key in columns) {
            options[key] = '';
        }
        return options;
    }

    handleSubmit(event) {
        let options = this.state.options;
        Meteor.call('search.single.all', options, this.props.dic, (error, results) => {
            if (error) throw new Meteor.Error(error);
            this.props.updateResults(results[0]);
        });
        event.preventDefault();
    }

    handleInput(key, event) {
        let options = this.state.options;
        options[key] = event.target.value;
        this.setState({
            options: options,
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
                        <input type='text' placeholder='輸入關鍵字' onChange={this.handleInput.bind(this, key)} value={this.state.options[key]}></input>
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