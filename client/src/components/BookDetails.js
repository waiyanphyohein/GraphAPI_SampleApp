import React,{ Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';
// import { Modal,Button } from 'react-bootstrap';

class BookDetails extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };     
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }    
    handleClose() {
        this.setState({
            show: false
        });
    }

    handleShow() {
        this.setState({
            show: true
        });
    }

    displayBookDetails() {
        const { book } = this.props.data;
        
        if (book) {                        
            return (
                <div>                    

                    <h2>{book.name}</h2>
                    <p><b>Genre</b>: {book.genre}</p>
                    <p><b>Author</b>: {book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map(book => {
                            return <li key={book.id}>{book.name}</li>  
                        })}
                    </ul>            
                {/* <Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
                        </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Save Changes
                        </Button>
					</Modal.Footer>
				</Modal> */}
                </div>
            )
        }
        else {
            return (<div>
                
            </div>)
        }
    }
    render() {                          
        return(
            <div id="book-details">
                {this.displayBookDetails()}
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id:props.bookId
            }
        }
    }
})(BookDetails)