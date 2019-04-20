/**/

const fs = require('fs');
const path = require('path');

function asyncFlow(generatorSpawn) {
    function specialCallback(err, ...args) {
        if (err) return generator.throw(err);
        //all resulting input is passed back to the generator Object
        generator.next(...args);
    }
    //startup once ready
    const generator = generatorSpawn(specialCallback);
    generator.next();
}


asyncFlow(function *(callback) {
    //The specialCallback passed to each asynchronous function will in turn resume the generator as soon as the asynchronous operation is complete
    const filename = path.basename(__filename);
    const thisObj = yield fs.readFile(filename, 'utf8', callback);
    yield fs.writeFile(`clone of ${filename}`, thisObj, callback);
    console.log(`Clone created`);
});


/*
* Sources used:
* https://medium.com/front-end-weekly/modern-javascript-and-asynchronous-programming-generators-yield-vs-async-await-550275cbe433
* */
