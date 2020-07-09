const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} = require('graphql');
const _ = require('lodash');

const Author = require('./../../models/author');

// The below code will be replaced with a service call to database for data retrieval.
// const authors = require('../data/dummydata').authors;

const BookType = (types) => new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: types.AuthorType,
            resolve(parent, args) {
                // return _.find(authors, {
                //     id: parent.authorId
                // });
                return Author.findById(parent.authorId);
            }
        }
    }),
    description: 'A type that contains data for books.'
});

module.exports = BookType;