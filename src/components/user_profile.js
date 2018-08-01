import  React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import api from '../utils/requests'
import TopNav from './navbar';

const UserAvatar = ()=> {
    return (
        <div>

            <Card style={{width: 220, margin: '1% auto 1% auto'}}>
                    <Avatar style={{height: 150, width: 150, margin: '1% auto 1% auto', backgroundColor: 'red'}}>
                        A
                    </Avatar>
                <CardContent style={{color: 'white'}}>
                    <Typography style={{textAlign: 'center', fontStyle: 'bold'}} component="p">
                        IamAUser
                    </Typography>
                    <Typography style={{textAlign: 'center'}} component="p">
                        user@example.com
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
};

const UnReturnedBooks = (props)=> {
    return (
    <React.Fragment>
        <TableRow>
            <TableCell padding={'dense'}>{props.book.id}</TableCell>
            <TableCell padding={'dense'}>{props.book.title}</TableCell>
            <TableCell padding={'dense'}>{props.book.author}</TableCell>
            <TableCell padding={'dense'}>
                <Button onClick={() => props.handleClick(props.book.id)}
                        variant={"contained"}
                        color={"primary"}>Return Book
                </Button>
            </TableCell>
        </TableRow>
    </React.Fragment>
    )
};

const BorrowingHistory = (props)=>{
    return (
        <React.Fragment>
            <TableRow>
                <TableCell padding={'dense'}>{props.borrowingHistory.title}</TableCell>
                <TableCell padding={'dense'}>{props.borrowingHistory.borrowed_on}</TableCell>
                <TableCell padding={'dense'}>{props.borrowingHistory.return_status ? 'Yes' : 'No'}</TableCell>
                <TableCell padding={'dense'}>{props.borrowingHistory.returned_on}</TableCell>
            </TableRow>
        </React.Fragment>
    )
};

class UserProfilePage extends Component {
    state = {
        borrowingHistory: [],
        unReturnedBooks: [],
        selectedBookID: 0,
        errors: ''
    };

    getBorrowingHistory = () => {
        api.get('users/books')
            .then(res => { this.setState({borrowingHistory: res.data}); console.log(res.data) })
            .catch(err => { this.setState({errors: err.response.data.message}); console.log(err.response.data.message)})
    };

    getUnReturnedBooks = ()=> {
        api.get('users/books?returned=false')
            .then(res => {this.setState({unReturnedBooks: res.data}); console.log(res)})
            .catch(err => {this.setState({errors: err.response.data.message})})
    };

    returnBook = (bookID)=> {
        api.put(`users/books/${bookID}`)
            .then(() => {this.getUnReturnedBooks()})
            .catch(err => {console.log(err)})
            .then(() => {this.getBorrowingHistory()})
    };

    componentDidMount() {
        this.getBorrowingHistory();
        this.getUnReturnedBooks();
    }

    render () {
        return (
            <div>
            <TopNav/>
                <div style={{margin: '5%'}}>
                <UserAvatar/>
                </div>
                <Paper style={{margin: '5% 5% 3% 5%'}}>
                    <br/>
                    <Typography style={{textAlign: 'center'}} variant={'headline'} component="h2">
                        Books you have not returned
                    </Typography>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>{'Book Id'}</TableCell>
                                <TableCell>{'Title'}</TableCell>
                                <TableCell>{'Author'}</TableCell>
                                <TableCell>{'Actions'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.unReturnedBooks.map(
                                book => <UnReturnedBooks
                                    book={book}
                                    handleClick={this.returnBook}
                                    key={book.id}
                                />
                            )}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper style={{margin: '0% 5% 0% 5%'}}>
                    <br/>
                    <Typography style={{textAlign: 'center'}} variant={'headline'} component="h2">
                        Your borrowing history
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{'Title'}</TableCell>
                                <TableCell>{'Borrowed On'}</TableCell>
                                <TableCell>{'Returned'}</TableCell>
                                <TableCell>{'Returned On'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.borrowingHistory.map(
                                hist => <BorrowingHistory
                                    borrowingHistory={hist}
                                    key={hist.borrow_id}
                                />
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default UserProfilePage;