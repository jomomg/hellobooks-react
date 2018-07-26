import React, {Component} from 'react'
import './css/books.css'
import TopNav from './navbar'
import axios from 'axios'
import AddBook from './add_book'

const books_url = "https://hello-kitabu.herokuapp.com/api/v1/books";

const EditButton = () => {
    return (
        <a className="btn-floating btn waves-effect waves-light blue modal-trigger"><i
            className="material-icons">edit</i></a>
    )
};

const DeleteButton = () => {
    return (
        <a className="btn-floating btn waves-effect waves-light red modal-trigger"
           ><i className="material-icons">delete</i></a>
    )
};

const FixedAddButton = () => {
    return (
        <div className="fixed-action-btn">
            <a className="btn-floating tooltipped btn-large waves-effect green modal-trigger" data-target="create-modal"
               data-position="top" data-delay="50" data-tooltip="Add a new book">
                <i className="large material-icons">add</i>
            </a>
        </div>
    )
};


const BookItem = (props) => {
    return (
        <React.Fragment>
            <li className="collection-item avatar">
                <img className="circle" src="http://placehold.it/100x100"/>
                <div id="book-info">
                    <p>Title: {props.bookInfo.title}</p>
                    <p>Author: {props.bookInfo.author}</p>
                    <p>Book ID: {props.bookInfo.id}</p>
                    <p>Publisher: {props.bookInfo.publisher}</p>
                    <p>Year: {props.bookInfo.publication_year}</p>
                    <p>Edition: {props.bookInfo.edition}</p>
                    <p>Category: {props.bookInfo.category}</p>
                    <p>Subcategory: {props.bookInfo.subcategory}</p>
                </div>
                    <ul className="secondary-content">
                        <li>
                            <EditButton/>
                            <DeleteButton/>
                        </li>
                    </ul>
            </li>
        </React.Fragment>
    );
};


class BookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = async ()=> {
        try {
            const response = await axios.get(books_url);
            const books = response.data;
            this.setState({books});
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div>
                <TopNav/>
                <div className="container">
                    <div className="section">
                        <ul className="collection">
                            {
                                this.state.books.map(book => <BookItem bookInfo={book} key={book.id}/>)
                            }
                        </ul>
                    </div>
                </div>
                <FixedAddButton/>
            </div>
        )
    }
}

export default BookPage