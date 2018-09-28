import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import dic_struct from '../api/dictionary_struct';
import '../api/update';
import { Data } from '../api/data';

class Update extends Component {
    constructor(props) {
        super(props);

        if(!Meteor.userId()) {
            this.props.history.push('/');
            return;
        }

        let rowNum = [];
        this.dics = [];
        for (let key in dic_struct) {
            let dicName = dic_struct[key].name;
            rowNum[dicName] = -1;
            this.dics.push(dicName);
        }

        this.state = {
            folder: '',
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

    componentWillReceiveProps(props) {
        this.setState({
            folder: props.folder,
        });
    }

    update() {
        Meteor.call('update.import', (error, result) => {
            console.log(result);
        });
    }
    
    changeFolder(event) {
        this.setState({
            folder: event.target.value,
        });
    }

    updateFolder() {
        Meteor.call('data.update.folder', this.state.folder);
    }

    render() {
        let dicRow = []
        for (let idx in this.dics) {
            let dicName = this.dics[idx];
            dicRow.push(
                <DicRow key={dicName} name={dicName} rowNum={this.state.rowNum[dicName]} setRowNum={this.setRowNum} folder={this.state.folder} />
            )
        }
        return (
            <div>
                <label>
                    <span>資料夾名稱</span>
                    <input id='folder' type='text' value={this.state.folder} onChange={this.changeFolder.bind(this)}></input>
                    <button onClick={this.updateFolder.bind(this)} className='Mbutton'>更新</button>
                </label>
                {dicRow}
                <button onClick={this.update.bind(this)} className='Mbutton'>Import all</button>
            </div>
        );
    }

    setRowNum(dicName, num) {
        let rowNum = this.state.rowNum;
        rowNum[dicName] = num;
        this.setState(rowNum);
    }
}

export default  withTracker(() => {
    Meteor.subscribe('data');
    const data = Data.findOne({});
    let folder = '';
    if (data !== undefined)
        folder = data.folder;
    return {
        folder: folder,
    };
})(withRouter(Update));

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
        Meteor.call('update.import', this.props.folder, name);
    }

    render() {
        return (
            <div>
                <b>{this.props.name}</b>: {this.props.rowNum >= 0 ? this.props.rowNum : 'waiting'}
                <button onClick={this.delete.bind(this, this.props.name)} className='Mbutton'>delete</button>
                <button onClick={this.import.bind(this, this.props.name)} className='Mbutton'>import</button>
            </div>
        );
    }
}