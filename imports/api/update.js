const baseUri = 'http://raw.githubusercontent.com/ChhoeTaigi/ChhoeTaigiDatabase/master/ChhoeTaigiDatabase/20180630-194713/';
const TaibunHoabunSoanntengSutianUri = baseUri + 'ChhoeTaigi_TaibunHoabunSoanntengSutian.csv';

import request from 'request';
import csv from 'csvtojson';
import knex from 'knex';

function fetch() {
    let jsonArray = [];
    csv()
    .fromStream(request.get(TaibunHoabunSoanntengSutianUri))
    .subscribe((json)=>{
        jsonArray.push(json);
    }, (error) => {
        
    }, () => {
        console.log('complete');
        Meteor.call('update.save', jsonArray);
    });
}

function save(jsonArray) {
    const pg = knex({
        client: 'postgresql',
        connection: {
          host:     '127.0.0.1',
          database: 'dictionary',
          user:     'postgres',
          password: '12345678',
        }
    });
    pg.batchInsert('TaibunHoabunSoanntengSutian', jsonArray)
    .catch((err) => {
        console.log("err: ", err);
    });
    console.log('complete');
}

Meteor.methods({
    'update.import'() {
        if (Meteor.isClient) fetch();
    },

    'update.save'(jsonArray) {        
        if (Meteor.isServer) save(jsonArray);
    }
});