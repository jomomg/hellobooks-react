import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import api from "../utils/requests";
import TopNav from "./navbar";
import Auth from "../utils/authentication";
import Notifier, { notify } from "./notifier";

/**
 * Material UI card that contains book title, 
 * author and a button for borrowing a book
 * @param {object} props 
 */
const BookInfo = (props)=> {
    return(
        <React.Fragment>
            <Grid item xs={4}>
                <Card style={{width: 320, height: 480}}>
                    <CardMedia
                        style={{height: 0, paddingTop: "90%",}}
                        image="http://placehold.it/300x400"
                        title={`${props.book.title}`}
                    />
                    <CardContent style={{padding: 8}}>
                        <Typography variant={"headline"} component="h2">{props.book.title}</Typography>
                        <Typography component="h2">{props.book.author}</Typography>
                    </CardContent>
                    <CardActions style={{display: "flex"}} disableActionSpacing>
                        {(Auth.isAuthenticated() && props.isAvailable()) &&
                    <Button onClick={props.handleClick} aria-label="Borrow this book" style={{backgroundColor: "orange"}}>
                        Borrow this book
                    </Button>}
                    </CardActions>
                </Card>
            </Grid>
        </React.Fragment>
    );
};

/**
 * Contains more book information like genre and description
 * @param {*} props 
 */
const SideInfo = (props)=> {
    return (
        <React.Fragment>
            <Grid item xs={4}>
                <Card style={{width: "320px", height: "480px"}}>
                    <CardContent>
                        <Typography variant="headline" component="h2">About this book</Typography>
                        <Divider/>
                        <Typography>{props.book.description}</Typography>
                        <Divider/><br/>
                        <Typography component="p">Publisher: {props.book.publisher}</Typography>
                        <Typography component="p">Year: {props.book.publication_year}</Typography>
                        <Typography component="p">category: {props.book.category}</Typography>
                        <Typography component="p">sub-category: {props.book.subcategory}</Typography>
                        <Divider/><br/>
                        <Chip
                            avatar={
                                <Avatar style={{color:"white", backgroundColor: props.isAvailable() ? "#00C853": "red"}}>
                                    {props.isAvailable() ? <CheckCircleOutline/> : <ErrorOutline/>}
                                </Avatar>
                            }
                            label={props.isAvailable() ? "Available": "Not Available"}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
    );
};

/**
 * Renders the main page. Arranges the BookInfo and 
 * SideInfo components into a grid 
 */
class SingleBookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            errors: null,
            message: "",
        };
    }

    // Get the book information using the books ID
    getSingleBook = (bookID) => {
        api.get(`books/${bookID}`)
            .then(res => {this.setState({book: res.data});})
            .catch(err => {
                this.setState({errors: (!err.response ? `${err}`: err.response.data.msg)});
                console.log(this.state.errors);
            });
    };

    // Method for borrowing a book
   borrowBook = bookID => () => {
       api.post(`users/books/${bookID}`)
           .then(res => {
               this.setState({message: res.data.msg});
               notify({message: this.state.message, variant: "success"}, ()=>{this.props.history.push("/profile");});
           })
           .catch(err => {
               console.log(err);
               this.setState({errors: err.response.data.msg });
               notify({message: this.state.errors, variant: "error"});
           });
   };

   // checks if a book is available
   isAvailable = () => {
       return this.state.book.available >= 1;
   };

   componentDidMount() {
       this.getSingleBook(this.props.match.params.id);
   }

   render() {
       return(
           <div>
               <TopNav title={"Book Info"} {...this.props}/>
               <div style={{marginLeft: "24%", marginRight: "1%", marginTop: "1%"}}>
                   <Grid container spacing={16}>
                       <BookInfo
                           isAvailable={this.isAvailable}
                           book={this.state.book}
                           handleClick={this.borrowBook(this.props.match.params.id)}/>
                       <SideInfo
                           isAvailable={this.isAvailable}
                           book={this.state.book}/>
                       <Notifier/>
                   </Grid>
               </div>
           </div>
       );
   }
}

export default SingleBookPage;