import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DicStruct from '../api/dictionary_struct';

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
        this.state = {
            dic: dic,
            columns: [],
        };
    }

    componentDidMount () {
        const script = document.createElement("script");

        script.src = `var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=306448440105903&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));`;
        script.async = true;

        document.getElementById('script').appendChild(script);
    }

    render() {
        let dic = this.state.dic
        let dicStruct = DicStruct.filter(struct => struct.name===dic)[0]
        let columnStruct = dicStruct.columns;
        let columns = this.state.columns;
        let content = [];
        for (let key in columns) {
            content.push((
                <li key={key}>{columnStruct[key]} - {columns[key]}</li>
            ));
        }

        let chineseName = dicStruct.chineseName;
        const path = 'https://' + window.location.hostname + this.props.location.pathname;
        console.log(path);
        return (
            <div>
                <div id="fb-root"></div>
                <div id='script'></div>
                <h2>{chineseName}</h2>
                <ul>
                    {content}
                </ul>
                <div className="fb-comments" data-href={path} data-numposts="5"></div>
            </div>
        );
    }
}

export default withRouter(Detail);