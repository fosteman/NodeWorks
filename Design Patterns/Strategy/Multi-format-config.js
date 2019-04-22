//Strategy pattern enables an object 'Context' to support variation in its logic by extracting variable parts into separate objects 'Strategies'. Each strategy has common interface, as expected by parenting Context.
//Multi-format configuration objects
//Notably, Passport.js http://passportjs.org - an authentification middleware for node enables support of different authentification providers (OAuth, localdb, custom) for requests, using Strategy pattern.

const fs = require('fs');
const objectPath = require('../node_modules/object-path'); //verbose, but straightforward access to deep properties
const ini = require('ini');

class Config {
    constructor(strategy) {
        this.data = {};
        this.strategy = strategy; //algorithm for parse\serialization of data
    }

    get(path) {
        return objectPath.get(this.data, path)
    }

    set(path, value) {
        return objectPath.set(this.data, path, value)
    }

    read(file) {
        console.log(`de-serializing from ${file}`);
        //delegate deserialization to strategy
        this.data = this.strategy.deserialize(fs.readFileSync(file, 'utf-8'));
    }
    save(file) {
        console.log(`Serializing to ${file}`);
        fs.writeFileSync(file, this.strategy.serialize(this.data));
    }
}
//additional strategies to consider transfomation of formats
//optionally strategy may be selected depending on format of the file using a map 'extension', referring to the right algorithm.

const strategies = {
    json: {
        deserialize: data => JSON.parse(data),
        serizalie: data => JSON.stringify(data, null, ' ');
    },
    ini: {
        deserialize: data => ini.parse(data);
        serizalize: data => ini.stringify(data)
    }
};
const jsonConfig = new strategies.json;
jsonConfig.read('sample.json');
jsonConfig.set('key', 'value');
jsonConfig.save('sample.json');

const iniConfig = new strategies.ini;
iniConfig.read('sample.ini');
iniConfig.set('key', 'value');
iniConfig.save('sample.ini');



