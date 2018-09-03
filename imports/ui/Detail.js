import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
            this.setState({
                columns: result[0],
            })
        });

        let struct = dicStruct.filter(struct => struct.name===dic)[0];
        let chineseName = struct.chineseName;
        this.state = {
            dic: dic,
            chineseName: chineseName,
            columns: [],
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
        const path = 'https://' + window.location.hostname + this.props.location.pathname;
        return (
            <div style={{minHeight: this.state.background_height}}>
                <div id='fb-root'></div>
                <div id='script'></div>
                <div id='word-container'>
                    <Word columns={this.state.columns}></Word>
                </div>
                <div id='resource-container'>
                    <a id='resource' href='#'>來源出處：{this.state.chineseName}</a>
                </div>
                <div id='fb-comments'>
                    <FacebookProvider appId='306448440105903'>
                        <Comments href={path} width='100%' />
                    </FacebookProvider>
                </div>
            </div>
        );
    }
}

export default withRouter(Detail);