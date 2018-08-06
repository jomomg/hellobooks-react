import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Link} from 'react-router-dom';
import api from '../utils/requests';
import Paper from '@material-ui/core/Paper'
import TopNav from './navbar'

const books_url = "books";

const BookCard = (props)=> {
    return (
        <React.Fragment>
        <Grid item xs={6} sm={3}>
            <Card style={{maxWidth: 200, maxHeight: 370}}>
                <CardMedia
                    style={{height: 200,}}
                    image="http://placehold.it/100x200"
                    title="Book Cover"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {props.title}
                    </Typography>
                    <Typography component="p">
                        {props.author}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant={'outlined'} size="small">
                        <Link to={`/books/${props.id}`}>More</Link>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
        </React.Fragment>
    )
};

class BookPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            loading: true,
            error: ""
        }
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks = async ()=> {
        try {
            this.setState({loading: true});
            const response = await api.get(books_url);
            const books = response.data;
            this.setState({books, loading: false});
            console.log(response);
        } catch (error) {
            console.error('error: ', error);
            this.setState({error: `${error}`, loading: false});
        }
    };

    render() {
        const { loading, error } = this.state;
        if (loading) {
            return (
                <div>
                    <TopNav/>
                    <LinearProgress variant="query" />
                </div>
            )
        }

        if (error) {
            return (
                <div>
                    <TopNav/>
                    <Paper style={{margin: '10% auto 1% auto', maxWidth: 300, backgroundColor: 'red', textAlign: 'center'}}>
                        <span style={{color: 'white'}}>{error}</span>
                    </Paper>
                        <Button style={{marginLeft: '46%', marginRight: '40%', backgroundColor: 'red'}} variant='contained' color={'primary'} onClick={this.getBooks}>Try Again</Button>
                </div>
            )
        }
        return (
            <div>
                <TopNav title={'All Books'}/>
                    <div style={{marginLeft: '10%', marginRight: '5%', marginTop: '1%'}}>
                        <Grid container spacing={24}>
                            {this.state.books.map(book => {
                                return (
                                    <BookCard key={book.id} title={book.title} author={book.author} id={book.id}/>
                                )
                            })}
                        </Grid>
                    </div>
            </div>
        )
    }
}

export default BookPage;