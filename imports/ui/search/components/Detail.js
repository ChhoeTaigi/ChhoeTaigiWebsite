import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import dicStruct from '../../../api/dicts/dictionary-struct';
import Word from "./Word";

class Detail extends Component {
    constructor (props) {
        super(props);
        let dic = this.props.match.params.dictionary;
        let id = this.props.match.params.id;
        Meteor.call('search.dicAndId', dic, id, (error, result) => {
            if (error) throw new Meteor.Error(error);
            const word = result[0];
            const title = word.PojUnicode;
            const columnName = this.state.struct.columns;
            for (let key in word) {
                word[columnName[key]] = word[key];
                delete word[key];
            }

            this.setState({
                word: word,
                title: title,
            });
        });

        const struct = dicStruct.find(struct => struct.name === dic);
        const chineseName = struct.chineseName;
        const path = 'https://' + window.location.hostname + props.location.pathname;

        this.state = {
            struct: struct,
            path: path,
            dic: dic,
            chineseName: chineseName
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div class='result-detail'>
                <div class='container'>
                    <div id='script'></div>
                    <div className='result-detail__query'>
                        <div className='result-detail__query-dic'>
                            {this.state.chineseName}：
                        </div>
                        <div className='result-detail__query-text'>
                            {this.state.title}
                        </div>
                    </div>
                    <div className='result-detail__table'>
                        <Word columns={this.state.word} dic={this.state.dic}></Word>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Detail);