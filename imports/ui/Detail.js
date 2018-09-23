import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FacebookProvider, { Comments } from 'react-facebook';

import dicStruct from '../api/dictionary_struct';
import Word from "./Word";

class Detail extends Component {
    constructor (props) {
        super(props);
        let dic = this.props.match.params.dictionary;
        let id = this.props.match.params.id;
        Meteor.call('search.dicAndId', dic, id, (error, result) => {
            if (error) throw new Meteor.Error(error);
            const word = result[0];
            const title = word.poj_unicode;
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

        const struct = dicStruct.filter(struct => struct.name === dic)[0];
        const chineseName = struct.chineseName;
        const path = 'https://' + window.location.hostname + props.location.pathname;

        this.state = {
            struct: struct,
            path: path,
            chineseName: chineseName,
            background_height: window.innerHeight - 148,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                background_height: window.innerHeight - 148,
            });
        });
    }

    render() {
        
        return (
            <div style={{minHeight: this.state.background_height}}>
                <div id='fb-root'></div>
                <div id='script'></div>
                <div id='poj-container'>{this.state.chineseName}：{this.state.title}</div>
                <div id='word-container'>
                    <Word columns={this.state.word}></Word>
                </div>
                <div id='fb-comments'>
                    <FacebookProvider appId='306448440105903'>
                        <Comments href={this.state.path} width='100%' />
                    </FacebookProvider>
                </div>
            </div>
        );
    }
}

export default withRouter(Detail);