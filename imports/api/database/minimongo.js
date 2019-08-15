import { Mongo } from 'meteor/mongo';
 
export const Minimongo = new Mongo.Collection('data');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('minimongo', function dataPublication() {
        if (this.userId)
            return Minimongo.find();
        else
            return Minimongo.find({}, {fields: {
                sessions: 1,
                clicks: 1,
            }});
    });
}
