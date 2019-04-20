const level = require('level');
const levelSubscribe = require('./levelSubscribe');

let db = level(__dirname + '/db', {valueEncoding: 'json'});
db = levelSubscribe(db);
db.subscribe(
    {doctype: 'tweet', language: 'en'},
    (_k, _val) => console.log(_val)
);
db.put('1', {doctype: 'tweet', text: 'Hello', language: 'en'});
db.put('2', {doctype: 'changelog', date: Date.now()});
