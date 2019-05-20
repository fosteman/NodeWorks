// ./lib/db.js
// Receives the service locator
const level = require('levelup');
const sublevel = require('level-sublevel');
module.exports =
    serviceLocator = serviceLocator => {
        const dbName = serviceLocator.get('db-sample-name');
        sublevel(level(dbName, {valueEncoding: 'json'}));
    };





