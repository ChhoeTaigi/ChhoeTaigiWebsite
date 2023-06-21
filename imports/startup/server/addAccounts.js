import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
    let names = ['hebi'];

    for (let idx in names) {
        let name = names[idx];
        if (!Accounts.findUserByUsername(name))
            Accounts.createUser({username: name, password: 'ChhoeTaigi'});
    }
});