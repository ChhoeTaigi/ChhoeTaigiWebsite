import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FacebookProvider, Comments } from 'react-facebook';

import dicStruct from '../api/dicts/dictionary-struct';
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

        const struct = dicStruct.find(struct => struct.name === dic);
        const chineseName = struct.chineseName;
        const path = 'https://' + window.location.hostname + props.location.pathname;

        this.state = {
            struct: struct,
            path: path,
            dic: dic,
            chineseName: chineseName,
            background_height: window.innerHeight - 154,
        };

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    componentDidUpdate() {
        if (window.FB)
            window.FB.XFBML.parse();
    }

    handleResize() {
        this.setState({
            background_height: window.innerHeight - 154,
        });
    }

    render() {
        return (
            <div style={{minHeight: this.state.background_height}}>
                <div id='fb-root'></div>
                <div id='script'></div>
                <div id='poj-container'>{this.state.chineseName}：{this.state.title}</div>
                <div id='word-container'>
                    <Word columns={this.state.word} dic={this.state.dic}></Word>
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