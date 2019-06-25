const { graphql } = require('graphql');
const readline = require('readline');
const mySchema = require('./schema');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const express = require('express');
const MONGO_URL = 'mongodb://localhost:27017/test';
const app = express();


MongoClient.connect(MONGO_URL, (err, db) => {
    if (err !== null) return err.message;
    console.log('Connected successfully');
    app.use('/graphql', graphqlHTTP({
        schema: mySchema,
        context: { db },
        graphiql: true
    }));
    app.listen(3000, () => console.log('Running Express.js on port 3000'));
    }
);
