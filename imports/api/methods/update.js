import request from 'request';
import csv from 'csvtojson';
import postgres from '../database/postgres';
import postgresDB from '../database/postgresDB';
import DicStruct from './../../api/dicts/dictionary-struct'
import constants from '../constants/constants';
import searchDicStruct from '../dicts/dictionary-struct-lomaji-search';
import { createTB } from "../database/createTable"
Meteor.methods({
    'update.rowNum'(dicName) {
        if (Meteor.isServer) {
            return postgres(dicName).count('*');
        }
    },

    'update.searchRowNum'(dicName) {
        if (Meteor.isServer) {
            const searchDicName = searchDicStruct.find(e => e.name === dicName).dbname;
            return postgres(searchDicName).count('*');
        }
    },

    'update.import'(dicName) {
        if (Meteor.isClient) {
            let dictionaryUri = constants.CHHOETAIGI_DATASOURCE_BASE_URL +
                constants.CHHOETAIGI_DATASOURCE_RELEASE_TAG +
                constants.CHHOETAIGI_DATASOURCE_DICT_URL_START +
                dicName +
                constants.CHHOETAIGI_DATASOURCE_DICT_URL_END;

            return new Promise((resolve, reject) => {
                let jsonArray = [];
                csv()
                    .fromStream(request.get(dictionaryUri))
                    .subscribe((json) => {
                        jsonArray.push(json);
                    }, (error) => {

                    }, () => {
                        console.log('client complete');
                        Meteor.call('update.save', dicName, jsonArray, (error, result) => {
                            if (error) reject(error);
                            resolve(result);
                            console.log('server complete');
                        });
                    });
            });

        }
    },

    'update.importSearch'(dicName) {
        if (Meteor.isClient) {
            let dictionaryUri = constants.CHHOETAIGI_DATASOURCE_BASE_URL +
                constants.CHHOETAIGI_DATASOURCE_RELEASE_TAG +
                constants.CHHOETAIGI_DATASOURCE_DICT_URL_START +
                dicName +
                constants.CHHOETAIGI_DATASOURCE_DICT_URL_END;

            return new Promise((resolve, reject) => {
                let jsonArray = [];
                csv()
                    .fromStream(request.get(dictionaryUri))
                    .subscribe((json) => {
                        jsonArray.push(json);
                    }, (error) => {

                    }, () => {
                        console.log('client complete');
                        Meteor.call('update.saveSearch', dicName, jsonArray, (error, result) => {
                            if (error) reject(error);
                            resolve(result);
                            console.log('server complete');
                        });
                    });
            });

        }
    },

    'update.save'(dicName, jsonArray) {
        console.log("資料表" + dicName + "：" + jsonArray);
        if (Meteor.isServer) {
            return postgres.batchInsert(dicName, jsonArray)
                .catch((err) => {
                    console.log("err: ", err);
                });
        }
    },

    'update.saveSearch'(dicName, jsonArray) {
        if (Meteor.isServer) {
            const searchDicName = searchDicStruct.find(e => e.name === dicName).dbname;
            return postgres.batchInsert(searchDicName, jsonArray)
                .catch((err) => {
                    console.log("err: ", err);
                });
        }
    },

    'update.delete'(dicName) {
        if (Meteor.isServer) {
            return postgres(dicName).delete().then(() => {
                return postgres(dicName).count('*');
            });
        }
    },

    'update.deleteSearch'(dicName) {
        if (Meteor.isServer) {
            const searchDicName = searchDicStruct.find(e => e.name === dicName).dbname;
            return postgres(searchDicName).delete().then(() => {
                return postgres(searchDicName).count('*');
            });
        }
    },

    // 建立資料庫
    "create.import"(newDbName) {
        if (Meteor.isServer) {
            postgresDB
                .raw("CREATE DATABASE dictionary")
                .then(function () {
                    postgresDB.destroy();
                });
        } else {
        }
    },

    // 個別新增

    'updateDistinct.import'(value) {
        if (Meteor.isClient) {
            let dictionaryUri = constants.CHHOETAIGI_DATASOURCE_NEWS_TITLE +
                DicStruct[value].name +
                constants.CHHOETAIGI_DATASOURCE_DICT_URL_END;

            console.log("GItURL:" + dictionaryUri)
            new Promise((resolve, reject) => {
                let jsonArray = [];
                csv()
                    .fromStream(request.get(dictionaryUri))
                    .subscribe((json) => {
                        jsonArray.push(json);
                    }, (error) => {
                        console.log("GItURLErr:" + error)
                    }, () => {
                        Meteor.call('update.save', DicStruct[value].name, jsonArray, (error, result) => {
                            if (error) {
                                reject(error)
                                console.log("updateErr:" + error)
                            };
                            resolve(result);
                            console.log("result result")
                        });
                    });
            });
        }
    },



    // 新增所有資料
    'updateALL.import'() {
        if (Meteor.isClient) {


            for (let idx in DicStruct) {


                let dictionaryUri = constants.CHHOETAIGI_DATASOURCE_NEWS_TITLE +
                    DicStruct[idx].name +
                    constants.CHHOETAIGI_DATASOURCE_DICT_URL_END;

                console.log("GItURL:" + dictionaryUri)
                new Promise((resolve, reject) => {
                    let jsonArray = [];
                    csv()
                        .fromStream(request.get(dictionaryUri))
                        .subscribe((json) => {
                            jsonArray.push(json);
                        }, (error) => {
                        }, () => {
                            Meteor.call('update.save', DicStruct[idx].name, jsonArray, (error, result) => {
                                if (error) reject(error);
                                resolve(result);
                                console.log('result result');
                            });
                        });
                });


            }




        }
    },

    // 建立資料表
    "createTB.import"(dicName) {
        console.log("createTB.import");
        if (Meteor.isServer) {
            createTB(postgres)
        }
    },

});