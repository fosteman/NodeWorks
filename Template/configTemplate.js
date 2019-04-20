//Template pattern mimics oop inheritance by defining abstract pseudo class (base), that represents algorithm. Derived concrete classes implement those virtual methods, in JS they are called template methods.
//Purpose is similar to Strategy, difference is in Implementation. Both mutate their strategy, however, Template is a prepackaged version, whilst Strategy is dynamically adapted.

//ConfigTemplate.js - is a Templated Strategy/Config.js. It loads and saves set of configurations properties (keys and values) using different formats (JSON and ini)

const fs = require('fs');
const objectPath = require('object-path');

module.exports = class ConfigTemplate {
    read(file) {
        console.log(`Deserializing from ${file}`);
        this.data = this._deserialize(fs.readFileSync(file, 'utf-8'));
    }
    save(file) {
        console.log(`Serializing into ${file}`);
        fs.writeFileSync(file, this._serialize(this.data));
    }
    get(path) {
        return objectPath.get(this.data, path);
    }
    set(path, value) {
        return objectPath.set(this.data, path, value);
    }
    _serialize() {
        throw new Error('_serialize() is an (c++) abstract method. No derived class implements this (js) template method. ');
    }
    _deserialize() {
        throw new Error('_deserialize() is an (c++) abstract method. No derived class implements this (js) template method. ');
    }
}

