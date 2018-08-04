import React, { Component } from 'react';

import DictionaryBrief from './DictionaryBrief';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            results: [],
        };
    }

    handleSubmit(event) {
        let searchMethod = Array.from(document.getElementsByName('searchMethod')).filter(e => e.checked)[0].value;
        let spellingMethod = Array.from(document.getElementsByName('spellingMethod')).filter(e => e.checked)[0].value;
        let spelling = document.getElementById('spelling').value;
        let hanlo_taibun_poj = document.getElementById('hanlo_taibun_poj').value;
        let hoabun = document.getElementById('hoabun').value;
        let english_descriptions = document.getElementById('english_descriptions').value;
        let params = {
            searchMethod: searchMethod,
            spellingMethod: spellingMethod,
            spelling: spelling,
            hanlo_taibun_poj: hanlo_taibun_poj,
            hoabun: hoabun,
            english_descriptions: english_descriptions,
        }
        Meteor.call('search.all', params, (error, results) => {
            if (error) throw new Meteor.Error(error);
            for (let idx in results) {
                if (results[idx].lists.length === 0)
                    delete results[idx];
            }
            this.setState({
                results: results,
            });
        });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label><input type="radio" name="searchMethod" value="equals" defaultChecked />精確搜尋</label>
                    <label><input type="radio" name="searchMethod" value="contains" />模糊搜尋</label>
                    <br />
                    <label><input type="radio" name="spellingMethod" value="poj_unicode" defaultChecked />白話字</label>
                    <label><input type="radio" name="spellingMethod" value="poj_input" />白話字輸入</label>
                    <label><input type="radio" name="spellingMethod" value="kiplmj_unicode" />教育部羅馬字</label>
                    <label><input type="radio" name="spellingMethod" value="kiplmj_input" />教育部羅馬字輸入</label>
                    <br />
                    <input type="text" id="spelling" placeholder="輸入關鍵字"/>
                    <br />
                    <label htmlFor="hanlo_taibun_poj">漢羅台文</label>
                    <input type="text" id="hanlo_taibun_poj" placeholder="輸入關鍵字"/>
                    <br />
                    <label htmlFor="hoabun">對應華文</label>
                    <input type="text" id="hoabun" placeholder="輸入關鍵字"/>
                    <br />
                    <label htmlFor="english_descriptions">對應英文</label>
                    <input type="text" id="english_descriptions" placeholder="輸入關鍵字"/>
                    <br />
                    <input type="submit" value="查詢" />
                </form>
                <div>
                    {this.state.results.map((result) => {
                        return <DictionaryBrief key={result.dic} list={result} />
                    })}
                </div>
            </div>
        )
    }
}