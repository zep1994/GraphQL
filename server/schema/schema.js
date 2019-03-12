const graphql = require('graphql')
const _ = require('lodash');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList } = graphql

//dummy data
var books = [
    { 'name': 'Name of the Wind', 'genre': 'Fantasy', 'id': '1', 'authorid': '1'},
    { 'name': 'Gone With the Wind', 'genre': 'Action', 'id': '2', 'authorid': '2'},
    { 'name': 'Rotten Tomatoes is rotten tomatoes', 'genre': 'Shitty Website', 'id': '3', 'authorid': '3'},
    { 'name': 'Name of the Wind', 'genre': 'Fantasy', 'id': '4', 'authorid': '1'},
    { 'name': 'Gone With the Wind', 'genre': 'Action', 'id': '5', 'authorid': '3'},
    { 'name': 'Game of Thrones', 'genre': 'Fantasy', 'id': '6', 'authorid': '1'},
    { 'name': 'Lord of the Rings', 'genre': 'Action', 'id': '7', 'authorid': '2'},
]

var authors = [
    { 'name': 'me', age: 24, id: '1'},
    { 'name': 'still me', age: 24, id: '2'},
    { 'name': 'always me', age: 24, id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorid})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent)
                return _.filter(books, { authorid: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        }
    }     
})

module.exports = new GraphQLSchema({
    query: RootQuery
})