//Adapter pattern enables access needed functionality
// i.e. Adapter wraps Adaptee, exposing different interface .
//Implementations: composition, where methods of adapter are bridges to adaptee's

//Using LevelUP through filesystem API. i.e. using LevelUP as a storage backend for simple fs operations. readFile, writeFile will be adapted as db.get and db.put

const path = require('path');
module.exports = function createFsAdapter (db) {
    const fs = {};
    //implement readFile
    fs.readFile = (filename, options, callback) => {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        else if (typeof options === 'string') {
            options = {encoding: options}
        }
        db.get(path.resolve(filename),
            {valueEncoding: options.encoding},
            (err, value) => {
            if (err) {
                //adaptation of only 1 error: enoent, to make behavior closer to original fs module's.
                if (err.type === 'NotFoundError') {
                    err = new Error(`'ENOENT', open ${filename}`);
                    err.code = 'ENOENT';
                }
                return callback && callback(err);
            }
            callback && callback(null, value);
            }
            );
    }
    fs.writeFile = (filename, contents, options, callback) => {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        else if (typeof options === 'string') {
            options = {encoding: options} //ignoring file permissions (options.mode)
        }
        db.put(path.resolve(filename),
            contents,
            { valueEncoding: options.encoding },
            callback
        );
    };
    //reveal the factory.
    return fs;
};
