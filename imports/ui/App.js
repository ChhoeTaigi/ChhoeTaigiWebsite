import React, { Component } from 'react';

import ResultRow from './ResultRow';
import DicStruct from '../api/dictionary_struct';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            results: [],
        };
    }

    handleSubmit(event) {
        let input = this.state.input;
        for (let key in input) {
            if (!input[key].trim()) {
                delete input[key];
            }
        }
        Meteor.call('search', input, (error, result) => {
            this.setState({
                results: result
            })
        });
        event.preventDefault();
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.id] = event.target.value; 
        this.setState({
            input: input
        });
    }

    render() {
        return (
            <div>
                <div><b>wildcard 字元:</b><br />
                    %: 任意字數<br />
                    _: 一個字<br /><br />
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        白話字輸入
                        <input id="poj_input" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        其他講法ê白話字輸入
                        <input id="poj_other_input" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        白話字萬國碼
                        <input id="poj_unicode" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        其他講法ê白話字萬國碼
                        <input id="poj_other_unicode" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        台羅輸入
                        <input id="tailo_input" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        其他講法ê台羅輸入
                        <input id="tailo_other_input" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        台羅萬國碼
                        <input id="tailo_unicode" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        其他講法ê台羅萬國碼
                        <input id="tailo_other_unicode" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        漢羅（白話字）
                        <input id="hanlo_poj" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        漢羅（台羅）
                        <input id="hanlo_tailo" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <label>
                        華語漢字
                        <input id="hoagi" type="text" onChange={this.handleChange.bind(this)} />
                    </label>
                    <br />
                    <input type="submit" value="查詢" />
                </form>
                <div>
                    {this.state.results.map((result) => {
                        let columns
                        for (let idx in DicStruct) {
                            if (DicStruct[idx].name === 'TaibunHoabunSoanntengSutian') {
                                columns = DicStruct[idx].columns;
                                break;
                            }
                        }
                        return <ResultRow key={result.id} result={result} columns={columns} />
                    })}
                </div>
            </div>
        )
    }
}