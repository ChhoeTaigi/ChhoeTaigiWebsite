import React, { Component } from 'react';

import dic_struct from '../api/dictionary_struct';
import '../api/update';

export default class Update extends Component {
    constructor(props) {
        super(props);

        let rowNum = [];
        this.dics = [];
        for (let key in dic_struct) {
            let dicName = dic_struct[key].name;
            rowNum[dicName] = -1;
            this.dics.push(dicName);
        }
        this.state = {
            rowNum: rowNum,
        };
        
        for (let idx in this.dics) {
            let dicName = this.dics[idx];
            Meteor.call('update.rowNum', dicName, (error, result) => {
                if (error) throw new Meteor.Error(error);
                rowNum[dicName] = result[0].count;
                this.setState({
                    rowNum: rowNum,
                })
            });
            
        }

        this.setRowNum = this.setRowNum.bind(this);
    }
    update() {
        Meteor.call('update.import', (error, result) => {
            console.log(result);
        });
    }
    
    render() {
        let dicRow = []
        for (let idx in this.dics) {
            let dicName = this.dics[idx];
            dicRow.push(
                <DicRow key={dicName} name={dicName} rowNum={this.state.rowNum[dicName]} setRowNum={this.setRowNum} />
            )
        }
        return (
            <div>
                {dicRow}
                <button onClick={this.update.bind(this)}>Import</button>
            </div>
        );
    }

    setRowNum(dicName, num) {
        let rowNum = this.state.rowNum;
        rowNum[dicName] = num;
        this.setState(rowNum);
    }
}

class DicRow extends Component {
    delete(name) {
        this.props.setRowNum(name, -1);
        Meteor.call('update.delete', name, (error, result) => {
            if (error) throw new Meteor.Error(error);
            this.props.setRowNum(name, result[0].count);
        })
    }

    import(name) {
        this.props.setRowNum(name, -1);
        Meteor.call('update.import', name);
    }

    render() {
        return (
            <div>
                <b>{this.props.name}</b>: {this.props.rowNum >= 0 ? this.props.rowNum : 'waiting'}
                <button onClick={this.delete.bind(this, this.props.name)}>delete</button>
                <button onClick={this.import.bind(this, this.props.name)}>import</button>
            </div>
        );
    }
}