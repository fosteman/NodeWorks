const {GraphQLList, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt} = require('graphql');

const QuoteType = new GraphQLObjectType({
    name: 'Quote',
    fields: {
        id: {
            type: GraphQLString,
            resolve: q => q._id
        },
        text: {
            type: GraphQLString,
            resolve: t => t.quoteText
        },
        author: {
            type: GraphQLString,
            resolve: t => t.quoteAuthor
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        allQuotes: {
            type: new GraphQLList(QuoteType),
            description: 'A list of all available quotes',
            resolve: (_, args, {db}) => db.collection('quote-collection').find().toArray()
        },
        count: {
            type: GraphQLInt,
            description: 'Count of all stored quotes',
            resolve: (_, args, {db}) => db.collection('quote-collection').estimatedDocumentCount()
        },
        randomQuote: {
            type: GraphQLList(QuoteType),
            description: 'Returns a randomly picked quote',
            resolve: (_, args, {db}) => db.collection('quote-collection').aggregate([{ $sample: { size: 1 } }]).toArray()
        }
    }
});

const schema = new GraphQLSchema({ query: queryType });
module.exports = schema;
