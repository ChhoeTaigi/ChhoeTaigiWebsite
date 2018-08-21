import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import DicStruct from '../api/dictionary_struct';

class SearchSingle extends Component {
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
            selectedDic: undefined,
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
            for (let idx in DicStruct) {
                let dic = DicStruct[idx].name;
                dicButtons.push(
                    <button key={dic} onClick={this.handleDicButton.bind(this, dic)}>{DicStruct[idx].chineseName}</button>
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
            searchOptions = <AllFieldOptions key='allFieldOptions' />;
        }

        // result
        let resultView = undefined;
        let results = this.state.results;
        if (results) {
            let chineseName = DicStruct.filter(e => e.name === results.dic)[0].chineseName;
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

    updateResults(results) {
        this.setState({
            results: results,
        });
    }
}

export default withRouter(SearchSingle);

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
        let columns = DicStruct.filter((e) => e.name === dic)[0].columns;
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
        let columns = DicStruct.filter((e) => e.name === dic)[0].columns;
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

    handleSubmit() {
        
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

class Word extends Component {
    render() {
        // dictionary url
        let id = this.props.columns.id;
        let dic = this.props.dic;
        const linkUri = '/' + dic + '/' + id;

        // dictionary details
        let dic_struct = DicStruct.filter(struct => struct.name===dic)[0].columns;
        let columns = this.props.columns;
        let content = [];
        for (let key in columns) {
            content.push((
                <li key={key}>{dic_struct[key]} - {columns[key]}</li>
            ));
        }
        return (
            <li>
                <Link to={linkUri} target='_blank'>
                    <ul>
                        {content}
                    </ul>
                </Link>
            </li>
        );
    }
}