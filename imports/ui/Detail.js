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
        };
    }

    componentDidMount () {
        /*
        const script = document.createElement("script");

        script.src = `var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=306448440105903&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));`;
        script.async = true;
        document.getElementById('script').appendChild(script);

        */
    }

    render() {
        const path = 'https://' + window.location.hostname + this.props.location.pathname;
        return (
            <div>
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