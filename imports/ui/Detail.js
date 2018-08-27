import React, { Component } from 'react';
import DicStruct from '../api/dictionary_struct';

export default class Detail extends Component {
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
        return (
            <div>
                <h2>{chineseName}</h2>
                <ul>
                    {content}
                </ul>
            </div>
        );

    }
}