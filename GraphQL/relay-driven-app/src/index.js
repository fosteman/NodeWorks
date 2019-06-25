const { MongoClient } = require('mongodb');
const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const express = require('express');

const app = express();
app.use(express.static('public'));

const mySchema = require('./graphQLSchema');
const MONGO_URL = "mongodb+srv://fosteman:120308032000@antilope-mjt4x.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(MONGO_URL, (err, db) => {
    assert.equal(null, err);
    console.log('Connected to MongoDB server');

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        context: { db },
        graphiql: true
    }));

    app.listen(3000, () =>
        console.log('Running Express.js on port 3000')
    );
});
