import React, {Component} from 'react'
import './css/books.css'
import api from '../utils/requests'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import MoreVert from '@material-ui/icons/MoreVert'
import TopNav from './navbar'
import DeleteDialog from './dialogs'


const books_url = "http://127.0.0.1:5000/api/v1/books";

const fabStyles = {
    position: 'fixed',
    bottom: '3%',
    right: '3%',
    backgroundColor: '#00C853', color: 'white'
};

const FloatingAddButton = () => {
    return (
        <div>
            <Button variant="fab" aria-label="Add" style={fabStyles}>
                <AddIcon />
            </Button>
        </div>
    )
};

const BookItem = (props) => {
    return (
        <React.Fragment>
            <TableRow>
                <TableCell padding={'dense'}>{props.book.id}</TableCell>
                <TableCell padding={'dense'}>{props.book.title}</TableCell>
                <TableCell padding={'dense'}>{props.book.author}</TableCell>
                <TableCell padding={'dense'}>{props.book.publication_year}</TableCell>
                <TableCell padding={'dense'}>{props.book.publisher}</TableCell>
                <TableCell padding={'dense'}>{props.book.subcategory}</TableCell>
                <TableCell padding={'none'}>
                    <Tooltip title='Edit'><IconButton onClick={props.handleEdit}><EditIcon/></IconButton></Tooltip>
                    <Tooltip title='Delete'><IconButton onClick={props.handleDelete}><DeleteIcon color={'error'}/></IconButton></Tooltip>
                    <Tooltip title='More'><IconButton onClick={props.handleMore}><MoreVert/></IconButton></Tooltip>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};


class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            dialogOpen: false,
        }
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = async ()=> {
        try {
            const response = await api.get(books_url);
            const books = response.data;
            this.setState({books});
        } catch (error) {
            console.log(error);
        }
    };

    deleteBook = async ()=> {console.log('Deleted')};

    handleDeleteClick = (e)=> {
        e.preventDefault();
        this.deleteBook();
        this.setState({dialogOpen: false})
    };

    handleOpenDialog = (e)=> {
        e.preventDefault();
        this.setState({dialogOpen: true})
    };

    handleClose = ()=> {this.setState({dialogOpen: false})};

    render() {
        return (
            <div>
                <TopNav/>
                <div style={{marginTop: '3%'}}>
                <Paper style={{width: '90%', margin: 'auto', overflowX: 'auto'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding={'dense'}>Book ID</TableCell>
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
                                       handleDelete={this.handleOpenDialog}
                                       key={book.id}/>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                    <DeleteDialog
                        open={this.state.dialogOpen}
                        handleClose={this.handleClose}
                        handleYes={this.handleDeleteClick}
                        handleNo={this.handleClose}
                    />
                </div>
                <FloatingAddButton/>
            </div>
        )
    }
}

export default AdminPage;