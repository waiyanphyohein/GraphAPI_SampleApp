import React,{
    Component
} from "react";
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
     books{
        name
        id
     }   
    }
`

const ImageSyle = {
    size: 'responsive',
    width: '100px',
    height: '80px'
};

class BookList extends Component {
    
    displayBooks() {       
        var data = this.props.data;
        if (data.loading || !data.books)
            return (                
                    <img src={
                        process.env.PUBLIC_URL + '/loading.gif'
                    }
                    alt = 'loading..'
                        className='img-responsive'
                        style = {
                            ImageSyle
                        } />
            );
        else {            
            return data.books.map(book => {
                return (<li key={book.id}>
                  {book.name}
              </li>)  
            });
        }
                
    }
    render() {              
        
        return(
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>    
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
