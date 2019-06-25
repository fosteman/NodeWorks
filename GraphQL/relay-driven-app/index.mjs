const { MongoClient } = require('mongodb');
const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const express = require('express');

const app = express();
app.use(express.static('public'));

import {schema}from './graphQLSchema';
const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, client) => {
    if (err) return console.error(err.message);
    console.log('Connected to MongoDB server');
    let db = client.db('test');
    app.use('/gql', graphqlHTTP({
        schema,
        context: { db },
        graphiql: true
    }));

    app.listen(3006, () =>
        console.log('Running Express API on port 3006')
    );
});
