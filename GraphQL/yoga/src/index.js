const {GraphQLServer} = require('graphql-yoga');
const quoteSchema = require('./quoteSchema');
const {MongoClient} = require("mongodb");
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const connectBackend = async () => await
    MongoClient.connect(process.env.MONGODB_URI || tmp,
        { useNewUrlParser: true },
        (err, client) => {
            if (err) throw new Error(err.message);
            const db = client.db('NodeWorks');
            console.log('Connected to MongoDB collection');
            //Create api endpoint
            const server = new GraphQLServer({
                schema: quoteSchema,
                context: {db},
            });
            server.start({ port: process.env.PORT || 3001, playground: '/api'});
        });
connectBackend().catch(e => console.error(e.message));

