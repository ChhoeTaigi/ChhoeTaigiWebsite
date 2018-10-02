import { Mongo } from 'meteor/mongo';
 
export const Data = new Mongo.Collection('data');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('data', function dataPublication() {
        if (this.userId)
            return Data.find();
        else
            return Data.find({}, {fields: {
                sessions: 1,
                clicks: 1,
            }});
    });
}

Meteor.methods({
    'data.update.folder'(folder) {
        if (Meteor.isServer && this.userId) {
            const data = Data.findOne();
            Data.update(data, {folder: folder});
        }
    },
})