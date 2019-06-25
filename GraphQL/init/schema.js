const {
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const roll = () => Math.floor(6 * Math.random()) + 1;

const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        diceRoll: {
            type: GraphQLList(GraphQLInt),
            resolve: () => [roll(), roll()]
        },
        imgURL: {
            type: GraphQLString,
            resolve: () => 'http://imgUrl...'
        } }
});
const mySchema = new GraphQLSchema({
    query: queryType
});
module.exports = mySchema;
