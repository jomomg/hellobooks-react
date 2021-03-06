import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import api from "../utils/requests";
import Notifier, { notify } from "./notifier";
import NotFound from "./NotFound";

const inputStyles = {
    marginLeft: "4%",
    marginRight: "1%",
    width: "400px"
};

/** 
 *Component for editing a book. 
 *It renders a form 
 */
class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            publisher: "",
            publication_year: "",
            edition: "",
            isbn: "",
            category: "",
            subcategory: "",
            description: "",
            errors: "",
            found: true
        };
    }

    /* event handlers */
    handleChange = name => (event) => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = bookID => (event) => {
        event.preventDefault();
        this.editBook(bookID);
    };

    // Method for sending put request to the api
    editBook = (bookID) => {
        api({
            method: "put",
            url: `books/${bookID}`,
            data: this.state,
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {
                notify({
                    message: res.data.msg, variant: "success"
                },
                () => {
                    this.props.history.push("/admin");
                });
            })
            .catch(err => this.setState({errors: err.response.data.msg}));
    };

    // Retrieves information about the book specified by the bookID
    retrieveBook = (bookID) => {
        api({
            method: "get",
            url: `books/${bookID}`,
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    title: data.title,
                    author: data.author,
                    publisher: data.publisher,
                    publication_year: data.publication_year,
                    edition: data.edition,
                    isbn: data.edition,
                    category: data.category,
                    subcategory: data.subcategory,
                    description: data.description,
                    found: true
                });
            }).catch(err => this.setState({errors: `${err}`, found: false}));
    };

    componentDidMount() {
        this.retrieveBook(this.props.match.params.id);
    }


    render() {
        if (!this.state.found) {
            return (<NotFound/>);
        }

        return (
            <Paper style={{ margin: "5% auto 5% auto", width: 450, height: 900, position: "relative" }}>
                <Typography variant={"headline"} component={"h2"} style={{ paddingTop: "3%", textAlign: "center" }}>
                    Edit Book
                </Typography>
                <form noValidate style={{ display: "flex", flexWrap: "wrap", width: "450px" }}
                    onSubmit={this.handleSubmit(this.props.match.params.id)}>
                    <TextField
                        style={inputStyles}
                        required
                        id="title"
                        label="Title"
                        placeholder={this.state.title}
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        required
                        id="author"
                        label="Author"
                        placeholder={this.state.author}
                        value={this.state.author}
                        onChange={this.handleChange("author")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="publisher"
                        label="publisher"
                        placeholder={this.state.publisher}
                        value={this.state.publisher}
                        onChange={this.handleChange("publisher")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="year"
                        label="Year"
                        placeholder={this.state.publication_year}
                        value={this.state.publication_year}
                        onChange={this.handleChange("publication_year")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="edition"
                        label="Edition"
                        placeholder={this.state.edition}
                        value={this.state.edition}
                        onChange={this.handleChange("edition")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        required
                        id="isbn"
                        label="ISBN"
                        placeholder={this.state.isbn}
                        value={this.state.isbn}
                        onChange={this.handleChange("isbn")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="category"
                        label="Category"
                        placeholder={this.state.category}
                        value={this.state.category}
                        onChange={this.handleChange("category")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="genre"
                        label="Genre"
                        placeholder={this.state.subcategory}
                        value={this.state.subcategory}
                        onChange={this.handleChange("subcategory")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="description"
                        label="Description"
                        rows={"8"}
                        placeholder={this.state.description}
                        multiline
                        value={this.state.description}
                        onChange={this.handleChange("description")}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant={"contained"}
                        color={"primary"}
                        style={{
                            backgroundColor: "orange",
                            color: "black",
                            position: "absolute",
                            bottom: "10px",
                            left: 195,
                            width: 40
                        }}
                    >SAVE
                    </Button>
                </form>
                <Notifier />
            </Paper>
        );
    }
}

export default EditBook;
