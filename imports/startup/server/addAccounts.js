import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
    let names = ['shiami', 'leo', 'eyes' , 'marco'];

    for (let idx in names) {
        let name = names[idx];
        if (!Accounts.findUserByUsername(name))
            Accounts.createUser({username: name, password: '0000'});
    }
});