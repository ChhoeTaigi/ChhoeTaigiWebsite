import { Accounts } from 'meteor/accounts-base';

Accounts.config({
    forbidClientAccountCreation: true,
    loginExpirationInDays: 1,
});