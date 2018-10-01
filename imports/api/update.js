const baseUri = 'https://raw.githubusercontent.com/ChhoeTaigi/ChhoeTaigiDatabase/master/ChhoeTaigiDatabase';

import request from 'request';
import csv from 'csvtojson';
import pg from './pg';

import searchDicStruct from './search_dictionary_struct';

Meteor.methods({
    'update.rowNum'(dicName) {
        if (Meteor.isServer) {
            return pg(dicName).count('*');
        }
    },

    'update.searchRowNum'(dicName) {
        if (Meteor.isServer) {
            const searchDicName = searchDicStruct.filter(e => e.name === dicName)[0].dbname;
            return pg(searchDicName).count('*');
        }
    },

    'update.import'(folder, dicName) {
        if (Meteor.isClient) {
            let dictionaryUri = baseUri + '/' + folder + '/ChhoeTaigi_' + dicName + '.csv';

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

    'update.importSearch'(folder, dicName) {
        if (Meteor.isClient) {
            let dictionaryUri = baseUri + '/' + folder + '/lomaji_search_table/ChhoeTaigi_' + dicName + '.csv';

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
            const searchDicName = searchDicStruct.filter(e => e.name === dicName)[0].dbname;
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
            const searchDicName = searchDicStruct.filter(e => e.name === dicName)[0].dbname;
            return pg(searchDicName).delete().then(() => {
                return pg(searchDicName).count('*');
            });
        }
    }
});