const fs = require('fs');
fs.writeFile('text.txt', 'Hello', () => {
    fs.readFile('file.txt', {encoding: 'utf8'}, (err, res) => console.log(res));
});
fs.readFile('missing.txt', {encoding: 'utf8'}, (err, res) => console.log(err));

const levelup = require('level');
const fsAdapter = require('LevelUP adapter');
const db = levelup('./fsDB', {valueEncoding: 'binary'});
const fs = fsAdapter (db);
