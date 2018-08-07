import React, { Component } from 'react';
import DicStruct from '../api/dictionary_struct';

export default class Detail extends Component {
    constructor (props) {
        super(props);
        Meteor.call('search.single.single', this.props.match.params.dictionary, this.props.match.params.id, (error, result) => {
            if (error) throw new Meteor.Error(error);
            this.setState({
                dic: result[0],
            })
        });
        this.state = {
            dic: [],
        };
    }

    render() {
        let dic = this.props.match.params.dictionary
        let dicStruct = DicStruct.filter(struct => struct.name===dic)[0].columns;
        let columns = this.state.dic;
        let content = [];
        for (let key in columns) {
            content.push((
                <li key={key}>{dicStruct[key]} - {columns[key]}</li>
            ));
        }
        return (
            <ul>
                {content}
            </ul>
        );

    }
}