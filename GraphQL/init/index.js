const { graphql } = require('graphql');
const readline = require('readline');
const mySchema = require('./schema');
const { MongoClient } = require('mongodb');
const assert = require('assert');

const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, db) => {
    if (err !== null) return err.message;
    console.log('Connected successfully');
    const rli = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rli.question('Client Request: ', inputQuery => {
        graphql(mySchema, inputQuery, {}, { db }).then(result => {
            console.log('Server Answer :', result.data);
        rli.close();
        });
    });

//callback for connect()
} );
