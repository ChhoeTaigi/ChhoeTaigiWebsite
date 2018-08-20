import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import DicStruct from '../api/dictionary_struct';

class SearchSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDic: undefined,
        };
    }

    handleDicButton(dic) {
        this.setState({
            selectedDic: dic,
            results: undefined,
        })
    }

    render() {
        let dicButtons = [];
        for (let idx in DicStruct) {
            let dic = DicStruct[idx].name;
            dicButtons.push(
                <button key={dic} onClick={this.handleDicButton.bind(this, dic)}>{DicStruct[idx].chineseName}</button>
            );
        }

        let searchOptions;
        let selectedDic = this.state.selectedDic;
        if (selectedDic) {
            searchOptions = <SearchOptions key='selectedDic' dic={selectedDic} updateResults={this.updateResults.bind(this)} />;
        }
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
        return (
            <div>
                {dicButtons}
                <br />
                {searchOptions}
                <br />
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

class SearchOptions extends Component {
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
                        <input type='text' placeholder='請輸入' onChange={this.handleInput.bind(this, key)} value={this.state.options[key]}></input>
                    </label>
                    <br />
                </div>
            )
        }
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                {inputs}
                <input type="submit" value="查詢" />
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