import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BasicSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchMethod: 'equals',
            spellingMethod: 'poj_unicode',
            spelling: '',
            hanlo_taibun_poj: '',
            hoabun: '',
            english_descriptions: '',
        };
    }

    handleSubmit(event) {
        this.params = {
            searchMethod: this.state.searchMethod,
            spellingMethod: this.state.spellingMethod,
            spelling: this.state.spelling,
            hanlo_taibun_poj: this.state.hanlo_taibun_poj,
            hoabun: this.state.hoabun,
            english_descriptions: this.state.english_descriptions,
        }
        Meteor.call('search.basic', this.params, (error, allResults) => {
            if (error) throw new Meteor.Error(error);
            for (let idx in allResults) {
                if (allResults[idx].words.length === 0)
                    delete allResults[idx];
            }

            let state = {allResults: allResults};
            this.props.history.push('all', state);
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
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label><input type="radio" name="searchMethod" value="equals" defaultChecked={this.state.searchMethod === 'equals'} onChange={this.handleInput.bind(this)} />精確搜尋</label>
                <label><input type="radio" name="searchMethod" value="contains" defaultChecked={this.state.searchMethod === 'contains'} onChange={this.handleInput.bind(this)} />模糊搜尋</label>
                <br />
                <label><input type="radio" name="spellingMethod" value="poj_unicode" defaultChecked={this.state.spellingMethod === 'poj_unicode'} onChange={this.handleInput.bind(this)} />白話字</label>
                <label><input type="radio" name="spellingMethod" value="poj_input" defaultChecked={this.state.spellingMethod === 'poj_input'} onChange={this.handleInput.bind(this)} />白話字輸入</label>
                <label><input type="radio" name="spellingMethod" value="kiplmj_unicode" defaultChecked={this.state.spellingMethod === 'kiplmj_unicode'} onChange={this.handleInput.bind(this)} />教育部羅馬字</label>
                <label><input type="radio" name="spellingMethod" value="kiplmj_input" defaultChecked={this.state.spellingMethod === 'kiplmj_input'} onChange={this.handleInput.bind(this)} />教育部羅馬字輸入</label>
                <br />
                <input type="text" name="spelling" placeholder="輸入關鍵字" value={this.state.spelling} onChange={this.handleInput.bind(this)} />
                <br />
                <label htmlFor="hanlo_taibun_poj">漢羅台文</label>
                <input type="text" name="hanlo_taibun_poj" placeholder="輸入關鍵字" value={this.state.hanlo_taibun_poj} onChange={this.handleInput.bind(this)} />
                <br />
                <label htmlFor="hoabun">對應華文</label>
                <input type="text" name="hoabun" placeholder="輸入關鍵字" value={this.state.hoabun} onChange={this.handleInput.bind(this)} />
                <br />
                <label htmlFor="english_descriptions">對應英文</label>
                <input type="text" name="english_descriptions" placeholder="輸入關鍵字" value={this.state.english_descriptions} onChange={this.handleInput.bind(this)} />
                <br />
                <input type="submit" value="查詢" />
            </form>
        );
    }
}

export default withRouter(BasicSearch);