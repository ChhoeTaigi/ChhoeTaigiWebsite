import request from 'request';
import csv from 'csvtojson';
import pg from './pg';

import constants from './constants';
import searchDicStruct from './dicts/dictionary-struct-lomaji-search';

Meteor.methods({
    'update.rowNum'(dicName) {
        if (Meteor.isServer) {
            return pg(dicName).count('*');
        }
    },

    'update.searchRowNum'(dicName) {
        if (Meteor.isServer) {
            const searchDicName = searchDicStruct.find(e => e.name === dicName).dbname;
            return pg(searchDicName).count('*');
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
                .subscribe((json)=>{
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
                .subscribe((json)=>{
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
        if (Meteor.isServer) {
            return pg.batchInsert(dicName, jsonArray)
            .catch((err) => {
                console.log("err: ", err);
            });
        }
    },

    'update.saveSearch'(dicName, jsonArray) {        
        if (Meteor.isServer) {
            const searchDicName = searchDicStruct.find(e => e.name === dicName).dbname;
            return pg.batchInsert(searchDicName, jsonArray)
            .catch((err) => {
                console.log("err: ", err);
            });
        }
    },

    'update.delete'(dicName) {
        if (Meteor.isServer) {
            return pg(dicName).delete().then(() => {
                return pg(dicName).count('*');
            });
        }
    },

    'update.deleteSearch'(dicName) {
        if (Meteor.isServer) {
            const searchDicName = searchDicStruct.find(e => e.name === dicName).dbname;
            return pg(searchDicName).delete().then(() => {
                return pg(searchDicName).count('*');
            });
        }
    }
});