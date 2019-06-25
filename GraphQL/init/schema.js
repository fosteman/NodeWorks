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
            type: new GraphQLList(GraphQLInt),
            args: {
                count: { type: GraphQLInt,
                defaultValue: 2}
            },
            resolve: (_, args) => {
                let rolls = [];
                for (let i = 0; i < args.count; i++) {
                    rolls.push(roll());
                }
                return rolls;
            }
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
