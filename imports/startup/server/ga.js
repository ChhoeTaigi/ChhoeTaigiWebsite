import { Minimongo } from '../../api/database/minimongo';

import { Logger }     from 'meteor/ostrio:logger';
import { LoggerConsole } from 'meteor/ostrio:loggerconsole';
import { LoggerFile } from 'meteor/ostrio:loggerfile';

const { google } = require('googleapis');

const enableLogger = false;
const enableFileLogger = false;

var log;
if (enableLogger) {
    log = new Logger();
    new LoggerConsole(log).enable();
}
if (enableLogger && enableFileLogger) {
    if (Meteor.isProduction) {
        new LoggerFile(log, {
            path: '/data/logs/'
        }).enable({
            enable: true,
            filter: ['*'], // Filters: 'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', 'TRACE', '*'
            client: false, // Set to `false` to avoid Client to Server logs transfer
            server: true  // Allow logging on server
        });
    } else {
        new LoggerFile(log, {
            path: './logs/'
        }).enable({
            enable: true,
            filter: ['*'], // Filters: 'ERROR', 'FATAL', 'WARN', 'DEBUG', 'INFO', 'TRACE', '*'
            client: false, // Set to `false` to avoid Client to Server logs transfer
            server: true  // Allow logging on server
        });
    }
}

const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
const email = 'ga-324@chhoetaigiwebsite.iam.gserviceaccount.com';
var jsonFile = '';
if (Meteor.isProduction) {
    jsonFile = '/data/keys/chhoetaigiwebsite-25c9db3da239.json';
} else {
    jsonFile = '../../../../../chhoetaigiwebsite-25c9db3da239.json';
}
const viewID = '180234162';
const updatePeriod = 60000; // ms

const queries = [
    {
        'metrics': 'ga:sessions',
    },
    {
        'metrics': 'ga:totalEvents',
        'dimensions': 'ga:eventAction',
    },
];

class GA {
    constructor() {
        this.run = false;
        this.queryNum = queries.length;
        this.queryIdx = 0;
    }

    start() {
        if (this.run) {
            this.stop();
        }
        this.run = true;
        this.intervalID = setInterval(this.get.bind(this), updatePeriod);
    }

    get() {
        let today = new Date();
        // year
        const yyyy = today.getFullYear();
        // month
        let mm = (today.getMonth() + 1) + ''; //January is 0!
        mm = new Array(2 - mm.length + 1).join('0') + mm
        // day
        let dd = today.getDate() + '';
        dd = new Array(2 - dd.length + 1).join('0') + dd
        
        today = yyyy + '-' + mm + '-' + dd;

        const jwtClient = new google.auth.JWT(
            email,
            jsonFile,
            null,
            scopes
        );
        
        // query
        const query = Object.assign({
            auth: jwtClient,
            'ids': 'ga:' + viewID,
            'start-date': '2018-01-01',
            'end-date': today
        }, queries[this.queryIdx]);

        // authorize
        jwtClient.authorize()
        .catch(error => {
            console.log(error);
            log.error("jwtClient error: " + JSON.stringify(error));
        })
        .then(() => {
            google.analytics('v3').data.ga.get(query)
            .catch(error => {
                console.log(error);
                if (enableLogger) {
                    log.error("ga error: " + JSON.stringify(error));
                }
            })
            .then(result => {
                if (enableLogger) {
                    console.log(result.data);
                    log.info("ga: " + JSON.stringify(result.data));
                }
                this.process(result.data.rows);
            });
        });
    }
    
    stop() {
        clearInterval(this.intervalID);
        this.run = false;
    }

    process(results) {
        const minimongo = Minimongo.findOne();
        if (this.queryIdx === 0) {
            const count = results[0][0];
            if (enableLogger) {
                console.log("visit count: "+ count);
                log.info("visit count: "+ count);
            }
            Minimongo.update(minimongo, {$set: {sessions: count}}, {upsert: true});
        } else if (this.queryIdx === 1) {
            const count = results[1][1];
            if (enableLogger) {
                console.log("search count: "+ count);
                log.info("search count: "+ count);
            }
            Minimongo.update(minimongo, {$set: {clicks: count}}, {upsert: true});
        }

        // update query index
        this.queryIdx = (this.queryIdx + 1) % this.queryNum;
    }
}

// check if only one record
let minimongo = Minimongo.find().fetch();
if (minimongo.length > 1) {
    Minimongo.remove({});
}

// check if GA data exists
minimongo = Minimongo.findOne({});
if (minimongo === undefined) {
    Minimongo.insert({
        sessions: 0,
        clicks: 0,
    });
} else {
    if (minimongo.sessions === undefined) {
        Minimongo.update(minimongo, {$set: {
            sessions: 0,
        }}, {upsert: true});
    }
    if (minimongo.clicks === undefined) {
        Minimongo.update(minimongo, {$set: {
            clicks: 0,
        }}, {upsert: true});
    }
}


const ga = new GA();
if (env === 'prod')
    ga.start();