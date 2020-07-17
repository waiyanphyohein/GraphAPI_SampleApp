import { gql } from 'apollo-boost';

const getAuthorsQuery = gql `
    {
     authors{
        name
        id
     }   
    }
`

const getBooksQuery = gql `
    {
     books{
        name
        id
        author{
            name
        }
     }   
    }
`

const addBookMutation = gql`

    mutation($name: String!,$genre: String!,$authorId: ID!){
        addBook(name:$name, genre: $genre, authorId: $authorId){
            id
            name            
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation };