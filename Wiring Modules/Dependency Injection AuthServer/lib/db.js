// ./lib/db.js
// Exposes levelUp db Factory. Reusable and Stateless
const level = require('levelup');
const sublevel = require('level-sublevel');
//creates new connection to LevelDB
//instance is then decorated with level-sublevel to undertake multiple collections (noSQL term)
module.exports =
    dbName =>
        sublevel(level(dbName, {valueEncoding: 'json'}));
//Singleton pattern, for stateful database handle itself is exported.





