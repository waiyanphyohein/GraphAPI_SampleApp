//#region Imports For Schema
// MARK : Imports
const _ = require('lodash');
const graphql = require('graphql');
const Author = require('../models/author');
const Book = require('../models/book');

const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLID // GraphQLID can manage both string and number type as long as the values can be translated numerically.
} = graphql;

// Dummy Data imports <For testing purpose>
// const {
//     books,
//     authors
// } = require('./data/dummydata');


// Types imports 
// MARK : GraphQL Object Type Injection 

/*
    I have no clue why I have to do thins in order to avoid circular dependency.
    This solution for this was found on Stack Overflow.
    The Source: "https://stackoverflow.com/questions/61259799/graphql-one-of-the-provided-types-for-building-the-schema-is-missing-a-name"
*/

const AuthorTypeInject = require('./Types/AuthorType');
const BookTypeInject = require('./Types/BookType');

// Types injection so that circular dependency can be bypassed.
const types = {};
types.AuthorType = AuthorTypeInject(types);
types.BookType = BookTypeInject(types);

const AuthorType = types.AuthorType;
const BookType = types.BookType;
//#endregion 


// Creating a query associating to BookType,
// which means what sort of function be allowed for front - end to call

//#region RootQuery
// MARK : RootQuery
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
                // return _.find(books, {
                //     id: args.id
                // });
                return Book.findById(args.id);
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
                // return _.find(authors, {
                //     id: args.id
                // });
                return Author.findById(args.id);
            },
            description: 'A type that contains data for authors.'
        },

        // Getting all books and their related data.
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({});
            }
        },

        // Getting all authors and their related data.
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        }
    },
    description: 'A Root Query that contains book, author and such.'

});
//#endregion

//#region Mutation
// MARK : Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: GraphQLString
                },
                genre: {
                    type: GraphQLString
                },
                authorId: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },
        // updateBook: {

        // },
    }
});
//#endregion
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});