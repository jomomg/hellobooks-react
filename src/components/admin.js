import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import api from "../utils/requests";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import TopNav from "./navbar";
import DeleteDialog from "./dialogs";
import CreateBook from "./create_book";


const books_url = "books";
let current_book_id = 0;

const fabStyles = {
    position: "fixed",
    bottom: "3%",
    right: "3%",
    backgroundColor: "#00C853", color: "white"
};

/**
 * Add book button fixed at the bottom of the code
 * @param {object} props
 */
const FloatingAddButton = (props) => {
    return (
        <div>
            <Button onClick={props.handleClick} variant="fab" aria-label="Add" style={fabStyles}>
                <AddIcon />
            </Button>
        </div>
    );
};

/**
 * Renders an individual row in the all books table.
 * It also renders buttons for editing and deleting a book
 * @param {object} props
 */
const BookItem = (props) => {
    return (
        <React.Fragment>
            <TableRow>
                <TableCell padding={"dense"}>{props.book.id}</TableCell>
                <TableCell padding={"dense"}>
                    <Link to={`/books/${props.book.id}`}>{props.book.title}</Link>
                </TableCell>
                <TableCell padding={"dense"}>{props.book.author}</TableCell>
                <TableCell padding={"dense"}>{props.book.publication_year}</TableCell>
                <TableCell padding={"dense"}>{props.book.publisher}</TableCell>
                <TableCell padding={"dense"}>{props.book.subcategory}</TableCell>
                <TableCell padding={"none"}>
                    <Tooltip title='Edit'>
                        <Route render={({ history }) => (
                            <IconButton onClick={() => history.push(`/edit/${props.book.id}`)}><EditIcon /></IconButton>
                        )} />
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton onClick={props.handleDelete(props.book.id)}><DeleteIcon color={"error"} /></IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

/** 
 * The main admin page. Contains methods for 
 * adding books, deleting and editing a book 
 */
class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            errors: "",
            messages: "",
            dialogOpenDelete: false, // trigger for delete dialog
            dialogOpenAdd: false, // trigger for add dialog
            title: "",
            author: "",
            publisher: "",
            publication_year: "",
            edition: "",
            isbn: "",
            category: "",
            subcategory: "",
            description: "",
            messages: "",
            errors: "",
        };
    }

    componentDidMount() {
        this.getBooks();
    }

    // Get all the books in the database
    getBooks = () => {
        api({
            method: "get",
            url: books_url,
            headers: { Authorization: "Bearer" + localStorage.getItem("accessToken") }
        })
            .then(res => { this.setState({ books: res.data }); })
            .catch(err => { this.setState({errors: err.response.data}); });
    };

    // POST the data entered in the form
    sendBookInfo = () => {
        api.post("books", {
            title: this.state.title,
            author: this.state.author,
            publisher: this.state.publisher,
            publication_year: this.state.publication_year,
            edition: this.state.edition,
            isbn: this.state.isbn,
            category: this.state.category,
            subcategory: this.state.subcategory,
            description: this.state.description
        }).then(res => {this.setState({ messages: res.data.msg });
        }).catch(err => this.setState({ errors: err.response.data.msg }));
    };

    // Send DELETE request to the api
    deleteBook = (bookID) => {
        api({
            method: "delete", 
            url: `books/${bookID}`,
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => { this.setState({ messages: res.data.msg }); })
            .catch(err => { this.setState({errors: err.data}); })
            .then(() => { this.getBooks(); });
    };

    /* Event handlers */
    handleDeleteClick = (e) => {
        e.preventDefault();
        this.deleteBook(current_book_id);
        this.setState({ dialogOpenDelete: false });
    };

    handleOpenDialogDelete = bookID => (event) => {
        event.preventDefault();
        current_book_id = bookID;
        this.setState({ dialogOpenDelete: true });
    };

    handleOpenDialogAdd = (e) => {
        e.preventDefault();
        this.setState({ dialogOpenAdd: true });
    };

    handleAddClick = (e) => {
        e.preventDefault();
        this.sendBookInfo();
        this.setState({ dialogOpenAdd: false });
        this.getBooks();
    };

    handleCloseDelete = () => {
        this.setState({ dialogOpenDelete: false });
        this.getBooks();
    };

    handleCloseAdd = () => {
        this.setState({ dialogOpenAdd: false });
        this.getBooks();
    };

    handleChange = name => (event) => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        return (
            <div>
                <TopNav title={"Admin Dashboard"} {...this.props} />
                <div style={{ marginTop: "3%" }}>
                    <Paper style={{ width: "90%", margin: "auto", overflowX: "auto" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding={"dense"}>Book ID</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Author</TableCell>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Publisher</TableCell>
                                    <TableCell>Genre</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.books.map(book => {
                                    return (
                                        <BookItem
                                            book={book}
                                            handleDelete={this.handleOpenDialogDelete}
                                            key={book.id} />
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                    <DeleteDialog
                        open={this.state.dialogOpenDelete}
                        handleClose={this.handleCloseDelete}
                        handleYes={this.handleDeleteClick}
                        handleNo={this.handleCloseDelete}
                    />
                    <CreateBook
                        open={this.state.dialogOpenAdd}
                        handleClose={this.handleCloseAdd}
                        handleAddClick={this.handleAddClick}
                        handleChange={this.handleChange}
                        title={this.state.title}
                        author={this.state.author}
                        publisher={this.state.publisher}
                        publication_year={this.state.publication_year}
                        edition={this.state.edition}
                        isbn={this.state.isbn}
                        category={this.state.category}
                        subcategory={this.state.subcategory}
                        description={this.state.description}
                    />
                </div>
                <FloatingAddButton handleClick={this.handleOpenDialogAdd} />
            </div>
        );
    }
}

export default AdminPage;