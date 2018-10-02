const { google } = require('googleapis');

const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
const email = 'ga-324@chhoetaigiwebsite.iam.gserviceaccount.com';
const jsonFile = '/Users/leo/Documents/git/ChhoeTaigi/server/chhoetaigiwebsite-22a755925ef2.json';
const viewID = '180234162';
const updatePeriod = 5000; // ms

class GA {
    constructor() {
        this.run = false;
    }

    start() {
        if (this.run) {
            this.stop();
        }
        this.run = true;
        this.intervalID = setInterval(this.get, updatePeriod);
    }

    get() {
        const jwtClient = new google.auth.JWT(
            email,
            jsonFile,
            null,
            scopes
        );
        
        jwtClient.authorize()
        .catch(error => console.log(error))
        .then(() => {
            google.analytics('v3').data.ga.get({
                auth: jwtClient,
                'ids': 'ga:' + viewID,
                'metrics': 'ga:sessions',
                'start-date': '2018-08-01',
                'end-date': '2018-10-01'
            })
            .catch(error => console.log(error))
            .then(result => {
                GA.prototype.process(result.data.totalsForAllResults);
            });
        });
    }
    
    stop() {
        clearInterval(this.intervalID);
        this.run = false;
    }

    process(data) {
        console.log(data);
    }
}

const ga = new GA();
ga.start();