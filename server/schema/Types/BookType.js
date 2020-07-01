const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType
} = require('graphql');

const BookType = new GraphQLObjectType({
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
        }
    }),
    description: 'A type that contains data for books.'
});

module.exports = BookType;