const { google } = require('googleapis');

const scopes = 'https://www.googleapis.com/auth/analytics.readonly';
const email = 'ga-324@chhoetaigiwebsite.iam.gserviceaccount.com';
const jsonFile = '/Users/leo/Documents/git/ChhoeTaigi/server/chhoetaigiwebsite-22a755925ef2.json';
const viewID = '180234162';

var analytics = google.analytics('v3');
var jwtClient = new google.auth.JWT(
    email,
    jsonFile,
    null,
    scopes
);

jwtClient.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        analytics.data.ga.get({
            auth: jwtClient,
            'ids': 'ga:' + viewID,
            'metrics': 'ga:pageviews,ga:sessions',
            'start-date': '2015-01-01',
            'end-date': '2015-03-09'
        }, function(err, response) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log(response);
            }
        });
    }
})