import {GraphQLSchema, GraphQLObjectType, GraphQLString} from 'graphql'

//Instantiate GraphQLSchema instance
export const mySchema  = new GraphQLSchema({
    //root query, mutation definitions
    query: queryType //query property
});

//The query and mutation properties are instances of the GraphQLObjectType class.
const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world' // is executed whenever hello is requested. hello is hence resolved with the return value 'world'
        }
    }
});
