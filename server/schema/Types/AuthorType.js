const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList
} = require('graphql');
const _ = require('lodash');
const books = require('../data/dummydata').books;

const AuthorType = (types) => new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(types.BookType),
            resolve(parent, args) {
                return _.filter(books, {
                    authorId: parent.id
                });
            }
        }
    }),
    description: 'A type that contains data for authors.'
});

module.exports = AuthorType;