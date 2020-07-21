import React,{
    Component
} from "react";
import { graphql } from 'react-apollo';
import {
    getBooksQuery
} from '../queries/queries';

// Component(s)
import BookDetails from "./BookDetails";


const ImageSyle = {
    size: 'responsive',
    width: '100px',
    height: '80px'
};

class BookList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        };
    }
    
    displayBooks() {       
        var data = this.props.data;
        console.log(data);
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
                return (
                    <li key={book.id} onClick={(e) => {
                        this.setState({ selected: book.id });
                    }}>
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
                < BookDetails bookId= {this.state.selected}
                />
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
