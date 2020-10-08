import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import dicStruct from '../../api/dicts/dictionary-struct';

import '../../api/methods/update';

class Update extends Component {
    constructor(props) {
        super(props);

        if (!Meteor.userId()) {
            this.props.history.push('/');
            return;
        }

        // init dic row num
        let rowNum = [];
        this.dics = [];
        for (let key in dicStruct) {
            let dic = dicStruct[key].name;
            rowNum[dic] = -1;
            this.dics.push(dic);
        }

        // // init search dic row num
        // let searchRowNum = [];
        // this.searchDics = [];
        // for (let key in searchDicStruct) {
        //     let dic = searchDicStruct[key].name;
        //     rowNum[dic] = -1;
        //     this.searchDics.push(dic);
        // }

        // state
        this.state = {
            rowNum: rowNum,
            // searchRowNum: searchRowNum,
        };

        // update dic row num
        for (let idx in this.dics) {
            let dic = this.dics[idx];
            Meteor.call('update.rowNum', dic, (error, result) => {
                if (error) throw new Meteor.Error(error);
                rowNum[dic] = result[0].count;
                this.setState({
                    rowNum: rowNum,
                })
            });

        }

        // // update search dic row num
        // for (let idx in this.searchDics) {
        //     let dic = this.searchDics[idx];
        //     Meteor.call('update.searchRowNum', dic, (error, result) => {
        //         if (error) throw new Meteor.Error(error);
        //         searchRowNum[dic] = result[0].count;
        //         this.setState({
        //             searchRowNum: searchRowNum,
        //         })
        //     });

        // }

        this.setRowNum = this.setRowNum.bind(this);
        // this.setSearchRowNum = this.setSearchRowNum.bind(this);
    }

    setRowNum(dic, num) {
        let rowNum = this.state.rowNum;
        rowNum[dic] = num;
        this.setState(rowNum);
    }

    // setSearchRowNum(dic, num) {
    //     let searchRowNum = this.state.searchRowNum;
    //     searchRowNum[dic] = num;
    //     this.setState(searchRowNum);
    // }

    update() {
        Meteor.call('update.import', (error, result) => {
            console.log(result);
        });
    }

    createDB() {
        console.log("按下");
        Meteor.call("createDatabase.import", (error, result) => {
            console.log("訊息" + result);
        });
    }

    createTB() {
        console.log("按下");
        Meteor.call("createTB.import", (error, result) => {
            console.log("訊息" + result);
        });
    }

    UpdateALLDate() {
        console.log("按下");
        Meteor.call("updateALL.import", (error, result) => {
            console.log("訊息" + result);
        });
    }

    UpdateDistinct(value) {
        console.log("按下");
        Meteor.call("updateDistinct.import", value, (error, result) => {
            console.log("訊息" + result);
        });
    }


    render() {
        // dic
        let dicRow = [];
        for (let idx in this.dics) {
            let dic = this.dics[idx];
            dicRow.push(
                <DicRow key={dic} name={dic} rowNum={this.state.rowNum[dic]} setRowNum={this.setRowNum} />
            )
        }

        // // search dic
        // let searchDicRow = [];
        // for (let idx in this.searchDics) {
        //     let dic = this.searchDics[idx];
        //     searchDicRow.push(
        //         <DicRow key={dic} name={dic} rowNum={this.state.searchRowNum[dic]} setRowNum={this.setSearchRowNum} search />
        //     )
        // }

        return (
            <div>
                <h1>新建資料庫</h1>
                <button onClick={this.createDB.bind(this)} className="Mbutton">
                    CreateDB
                </button>
                <h1>新建資料表</h1>
                <button onClick={this.createTB.bind(this)} className="Mbutton">
                    CreateTB
               </button>
                {/*  */}

                <h1>新增 1913 甘字典</h1>
                <button onClick={this.UpdateDistinct.bind(this, 0)} className="Mbutton">
                    Update
                </button>

                <h1>新增 1928 台灣植物名彙</h1>
                <button onClick={this.UpdateDistinct.bind(this, 1)} className="Mbutton">
                    Update
                </button>

                <h1>新增 1932 台日大辭典(台譯版)</h1>
                <button onClick={this.UpdateDistinct.bind(this, 2)} className="Mbutton">
                    Update
                </button>

                <h1>新增 1956 台灣白話基礎語句</h1>
                <button onClick={this.UpdateDistinct.bind(this, 3)} className="Mbutton">
                    Update
                </button>


                <h1>新增 1973 Embree台英辭典</h1>
                <button onClick={this.UpdateDistinct.bind(this, 4)} className="Mbutton">
                    Update
                </button>


                <h1>新增 1976 Maryknoll台英辭典</h1>
                <button onClick={this.UpdateDistinct.bind(this, 5)} className="Mbutton">
                    Update
                </button>


                <h1>新增 2002+ 台華線頂對照典</h1>
                <button onClick={this.UpdateDistinct.bind(this, 6)} className="Mbutton">
                    Update
                </button>


                <h1>新增 2009 TJ台語白話小辭典</h1>
                <button onClick={this.UpdateDistinct.bind(this, 7)} className="Mbutton">
                    Update
                </button>


                <h1>新增 2011+ 教育部台語辭典</h1>
                <button onClick={this.UpdateDistinct.bind(this, 8)} className="Mbutton">
                    Update
                </button>


                <h1>新增 2016+ iTaigi華台對照典</h1>
                <button onClick={this.UpdateDistinct.bind(this, 9)} className="Mbutton">
                    Update
                </button>

                {/*  */}


                <h1>更新辭典資料庫</h1>
                <h2>主要辭典</h2>
                {dicRow}
                <hr />
            </div>
        );
    }
}

export default withRouter(Update);

class DicRow extends Component {
    delete(dic) {
        this.props.setRowNum(dic, -1);
        Meteor.call('update.delete', dic, (error, result) => {
            if (error) throw new Meteor.Error(error);
            this.props.setRowNum(dic, result[0].count);
        })
    }

    // deleteSearch(dic) {
    //     this.props.setRowNum(dic, -1);
    //     Meteor.call('update.deleteSearch', dic, (error, result) => {
    //         if (error) throw new Meteor.Error(error);
    //         this.props.setRowNum(dic, result[0].count);
    //     })
    // }

    import(dic) {
        this.props.setRowNum(dic, -1);
        Meteor.call('update.import', dic);
    }

    // importSearch(dic) {
    //     this.props.setRowNum(dic, -1);
    //     Meteor.call('update.importSearch', dic);
    // }

    render() {
        let deleteButton;
        let importButton;
        // if (this.props.search) {
        //     deleteButton = <button onClick={this.deleteSearch.bind(this, this.props.name)} className='Mbutton'>delete</button>;
        //     importButton = <button onClick={this.importSearch.bind(this, this.props.name)} className='Mbutton'>import</button>;
        // } else {
            deleteButton = <button onClick={this.delete.bind(this, this.props.name)} className='Mbutton'>delete</button>;
            // importButton = <button onClick={this.import.bind(this, this.props.name)} className='Mbutton'>import</button>;
        // }

        return (
            <div>
                <b>{this.props.name}</b>: {this.props.rowNum >= 0 ? this.props.rowNum : 'waiting'}
                {deleteButton}
                {importButton}
            </div>
        );
    }
}