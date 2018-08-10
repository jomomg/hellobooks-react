import  React, {Component} from "react";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import api from "../utils/requests";
import TopNav from "./navbar";
import Auth from "../utils/authentication";
import {Link} from "react-router-dom";

/**
 * Renders a user avatar with the users names and email
 */
const UserAvatar = ()=> {
    const { first_name, last_name, email } = Auth.getUserInfo();
    return (
        <div>

            <Card style={{width: 220, margin: "1% auto 1% auto"}}>
                <Avatar style={{height: 150, width: 150, margin: "1% auto 1% auto", backgroundColor: "red"}}>
                    {first_name.charAt(0)}
                </Avatar>
                <CardContent style={{color: "white"}}>
                    <Typography style={{textAlign: "center", fontStyle: "bold"}} component="p">
                        {`${first_name} ${last_name}`}
                    </Typography>
                    <Typography style={{textAlign: "center"}} component="p">
                        {`${email}`}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

/**
 * Renders a table row with information about an unreturned book, 
 * as well as a button for returning the book
 * @param {*} props 
 */
const UnReturnedBooks = (props)=> {
    return (
        <React.Fragment>
            <TableRow>
                <TableCell padding={"dense"}>{props.book.id}</TableCell>
                <TableCell padding={"dense"}>
                    <Link to={`/books/${props.book.id}`}>{props.book.title}</Link>
                </TableCell>
                <TableCell padding={"dense"}>{props.book.author}</TableCell>
                <TableCell padding={"dense"}>
                    <Button onClick={() => props.handleClick(props.book.id)}
                        variant={"contained"}
                        color={"primary"}>Return Book
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

/**
 * Render a table row with a users borrowing history
 * @param {*} props 
 */
const BorrowingHistory = (props)=>{
    return (
        <React.Fragment>
            <TableRow>
                <TableCell padding={"dense"}>{props.borrowingHistory.title}</TableCell>
                <TableCell padding={"dense"}>{props.borrowingHistory.borrowed_on}</TableCell>
                <TableCell padding={"dense"}>{props.borrowingHistory.return_status ? "Yes" : "No"}</TableCell>
                <TableCell padding={"dense"}>{props.borrowingHistory.returned_on}</TableCell>
            </TableRow>
        </React.Fragment>
    );
};

/**
 * Renders the main profile page. Contains tables for unreturned books 
 * and borrowing history
 */
class UserProfilePage extends Component {
    state = {
        borrowingHistory: [],
        unReturnedBooks: [],
        selectedBookID: 0,
        errors: ""
    };

    // Get all the books the user has borrowed
    getBorrowingHistory = () => {
        api.get("users/books")
            .then(res => { this.setState({borrowingHistory: res.data}); console.log(res.data); })
            .catch(err => { console.log(err.response);});
    };

    // Get the books yet to be returned by the user
    getUnReturnedBooks = ()=> {
        api({
            method: "get",
            url: "users/books?returned=false",
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {this.setState({unReturnedBooks: res.data}); console.log(res);})
            .catch(err => {
                console.log(`${err}`);
                this.setState({errors: `${err}`});
            });
    };

    // This method makes the return book api call
    returnBook = (bookID)=> {
        api.put({
            method: "put",
            url: `users/books/${bookID}`,
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(() => {this.getUnReturnedBooks();})
            .catch(err => {console.log(err);})
            .then(() => {this.getBorrowingHistory();});
    };

    componentDidMount() {
        this.getBorrowingHistory();
        this.getUnReturnedBooks();
    }

    render () {
        return (
            <div>
                <TopNav title={"My Profile"} {...this.props}/>
                <div style={{margin: "5%"}}>
                    <UserAvatar/>
                </div>
                <Paper style={{margin: "5% 5% 3% 5%"}}>
                    <br/>
                    <Typography style={{textAlign: "center"}} variant={"headline"} component="h2">
                        Books you have not returned
                    </Typography>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>{"Book Id"}</TableCell>
                                <TableCell>{"Title"}</TableCell>
                                <TableCell>{"Author"}</TableCell>
                                <TableCell>{"Actions"}</TableCell>
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
                <Paper style={{margin: "0% 5% 0% 5%"}}>
                    <br/>
                    <Typography style={{textAlign: "center"}} variant={"headline"} component="h2">
                        Your borrowing history
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{"Title"}</TableCell>
                                <TableCell>{"Borrowed On"}</TableCell>
                                <TableCell>{"Returned"}</TableCell>
                                <TableCell>{"Returned On"}</TableCell>
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
        );
    }
}

export default UserProfilePage;