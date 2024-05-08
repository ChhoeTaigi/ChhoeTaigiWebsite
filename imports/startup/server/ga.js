import { Minimongo } from '../../api/database/minimongo';

import { Logger } from 'meteor/ostrio:logger';
import { LoggerConsole } from 'meteor/ostrio:loggerconsole';
import { LoggerFile } from 'meteor/ostrio:loggerfile';

// Imports the Data library
const { BetaAnalyticsDataClient } = require('@google-analytics/data').v1beta;

var jsonFile = '';
if (Meteor.isProduction) {
    jsonFile = '/data/keys/chhoetaigiwebsite-25c9db3da239.json';
} else {
    jsonFile = '../../../../../chhoetaigiwebsite-25c9db3da239.json';
}

// Explicitly use service account credentials by specifying
// the private key file.
const analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: jsonFile,
});

const propertyId = "378760521";
const sessionCountBefore20230526 = 1026840;
const pageViewCountBefore20230526 = 8665444;
const updatePeriod = 5 * 60 * 1000; // ms

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

class GA {
    constructor() {
        this.firstTimeRunOnce = false;
    }

    start() {
        if (this.firstTimeRunOnce) {
            this.stop();
        }

        // run once
        this.runBatchReport();
        this.firstTimeRunOnce = true;

        // repeat task
        this.intervalID = setInterval(this.runBatchReport.bind(this), updatePeriod);
    }

    async runBatchReport() {
        try {
            const [response] = await analyticsDataClient.batchRunReports({
                property: `properties/${propertyId}`,
                requests: [
                    {
                        "dateRanges": [
                            {
                                "startDate": "2023-05-27",
                                "endDate": "today"

                            }

                        ],
                        "metrics": [
                            {
                                "name": "sessions"

                            }

                        ]

                    },
                    {
                        "dateRanges": [
                            {
                                "startDate": "2023-05-27",
                                "endDate": "today"

                            }

                        ],
                        "metrics": [
                            {
                                "name": "eventCount"

                            }

                        ],
                        "dimensions": [
                            {
                                "name": "eventName"

                            }

                        ]

                    }

                ]
            });

            if (enableLogger) {
                console.log('Batch report results:');
                response.reports.forEach(report => {
                    this.printRunReportResponse(report);
                });
            }
            this.process(response.reports);
        } catch (error) {
            console.log(error);
            if (enableLogger) {
                log.error("ga error: " + JSON.stringify(error));
            }
        }
    }

    // Prints results of a runReport call.
    printRunReportResponse(report) {
        //[START analyticsdata_print_run_report_response_header]
        console.log(`${report.rowCount} rows received`);
        report.dimensionHeaders.forEach(dimensionHeader => {
            console.log(`Dimension header name: ${dimensionHeader.name}`);
        });
        report.metricHeaders.forEach(metricHeader => {
            console.log(
                `Metric header name: ${metricHeader.name} (${metricHeader.type})`
            );
        });
        //[END analyticsdata_print_run_report_response_header]

        // [START analyticsdata_print_run_report_response_rows]
        console.log('Report result:');
        report.rows.forEach(row => {
            if (!this.isNullOrUndefined(row.dimensionValues[0])) {
                console.log(
                    `Dimension value: ${row.dimensionValues[0].value}`
                );
            }
            if (!this.isNullOrUndefined(row.metricValues[0])) {
                console.log(
                    `Metric value: ${row.metricValues[0].value}`
                );
            }
        });
        // [END analyticsdata_print_run_report_response_rows]
    }
    // [END analyticsdata_run_batch_report]

    isNullOrUndefined(value) {
        return value === undefined || value === null;
    }

    stop() {
        clearInterval(this.intervalID);
        this.firstTimeRunOnce = false;
    }

    process(reports) {
        if (enableLogger) {
            console.log("process ga response.")
        }

        const minimongo = Minimongo.findOne();

        const sessionCount = parseInt(reports[0].rows[0].metricValues[0].value) + sessionCountBefore20230526;
        if (enableLogger) {
            console.log("sessionCount: " + sessionCount);
            log.info("sessionCount: " + sessionCount);
        }
        Minimongo.update(minimongo, { $set: { sessions: sessionCount } }, { upsert: true });

        const pageViewCount = parseInt(reports[1].rows[0].metricValues[0].value) + pageViewCountBefore20230526;
        if (enableLogger) {
            console.log("pageViewCount: " + pageViewCount);
            log.info("pageViewCount: " + pageViewCount);
        }
        Minimongo.update(minimongo, { $set: { clicks: pageViewCount } }, { upsert: true });
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
        Minimongo.update(minimongo, {
            $set: {
                sessions: 0,
            }
        }, { upsert: true });
    }
    if (minimongo.clicks === undefined) {
        Minimongo.update(minimongo, {
            $set: {
                clicks: 0,
            }
        }, { upsert: true });
    }
}

const ga = new GA();
ga.start();
