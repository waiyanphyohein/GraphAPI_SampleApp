const _ = require('lodash');
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID // GraphQLID can manage both string and number type as long as the values can be translated numerically.
} = graphql;

// Dummy Data imports
const {
    books,
    authors
} = require('./data/dummydata');


// Types imports 
const AuthorType = require('./Types/AuthorType');
const BookType = require('./Types/BookType');


// Creating a query associating to BookType,
// which means what sort of function be allowed for front - end to call

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // code to get data from db/other source
                // The following code search for a data from a variable, in this case from books, and return a value based on specific field
                return _.find(books, {
                    id: args.id
                });
            },
            description: 'A type that contains data for books.'
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return _.find(authors, {
                    id: args.id
                });
            },
            description: 'A type that contains data for authors.'
        }
    },
    description: 'A Root Query that contains book, author and such.'

});

module.exports = new GraphQLSchema({
    query: RootQuery
});