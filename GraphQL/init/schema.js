const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        imgURL: {
            type: GraphQLString,
            resolve: () => 'http://imgUrl...'
        } }
});
const mySchema = new GraphQLSchema({
    query: queryType
});
module.exports = mySchema;
