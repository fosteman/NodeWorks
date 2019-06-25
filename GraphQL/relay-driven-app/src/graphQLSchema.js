import {GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import {GraphQLInt} from "graphql/type/scalars";
import {GraphQLSchema} from "graphql/type/schema";

const QuoteType = new GraphQLObjectType({
    name: 'Quote',
    fields: {
        id: {
            type: GraphQLString,
            resolve: obj => obj._id //manual resolve
        },
        text: {type: GraphQLString}, //auto resolve
        author: {type: GraphQLString}
    }
});

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        quoteCount: {
            description: 'Total count of quotes stored in the db',
            type: GraphQLInt,
            resolve: (_, args, {db}) => db.collection('quotes').count()
        },
        allQuotes: {
            type: new GraphQLList(QuoteType),
            description: 'A list of the quotes in the db',
            resolve: (_, args, {db}) => db.collection('quotes').find().toArray()
        }
    }
});

export const schema = new GraphQLSchema({
    query: queryType
});

