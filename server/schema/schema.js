const graphql = require('graphql')
const _ = require('lodash');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt } = graphql

//dummy data
var books = [
    { 'name': 'Name of the Wind', 'genre': 'Fantasy', 'id': '1'},
    { 'name': 'Gone With the Wind', 'genre': 'Action', 'id': '2'},
    { 'name': 'Rotten Tomatoes is rotten tomatoes', 'genre': 'Shitty Website', 'id': '3'}
]

var books = [
    { 'name': 'me', age: 24, id: '1'},
    { 'name': 'still me', age: 24, id: '2'},
    { 'name': 'always me', age: 24, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                return _.find(books, {id: args.id})
            }
        }
    }     
})

module.exports = new GraphQLSchema({
    query: RootQuery
})