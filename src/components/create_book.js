import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const inputStyles = {
    marginLeft: "4%",
    marginRight: "1%",
    width: "400px"
};

const CreateBook = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle id="alert-dialog-title">Add a New Book</DialogTitle>
            <DialogContent>
                <form noValidate style={{ display: "flex", flexWrap: "wrap", width: "450px" }}>
                    <TextField
                        style={inputStyles}
                        required
                        id="title"
                        label="Title"
                        placeholder="The book title"
                        value={props.title}
                        onChange={props.handleChange("title")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        required
                        id="author"
                        label="Author"
                        placeholder="The book's author"
                        value={props.author}
                        onChange={props.handleChange("author")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="publisher"
                        label="publisher"
                        placeholder="The book's publisher"
                        value={props.publisher}
                        onChange={props.handleChange("publisher")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="year"
                        label="Year"
                        placeholder="Publication year"
                        value={props.publication_year}
                        onChange={props.handleChange("publication_year")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        type={"number"}
                        id="edition"
                        label="Edition"
                        placeholder="What edition is the book?"
                        value={props.edition}
                        onChange={props.handleChange("edition")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        required
                        id="isbn"
                        label="ISBN"
                        placeholder="The book's ISBN number"
                        value={props.isbn}
                        onChange={props.handleChange("isbn")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="category"
                        label="Category"
                        placeholder="e.g Fiction, Non-Fiction, Reference"
                        value={props.category}
                        onChange={props.handleChange("category")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="genre"
                        label="Genre"
                        placeholder="e.g History, Romance, Thriller"
                        value={props.subcategory}
                        onChange={props.handleChange("subcategory")}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        id="description"
                        label="Description"
                        rows={"8"}
                        placeholder="What is this book about?"
                        multiline
                        value={props.description}
                        onChange={props.handleChange("description")}
                        margin="normal"
                    />
                    <Button
                        onClick={props.handleAddClick}
                        variant={"extendedFab"}
                        color={"primary"}
                        style={{ backgroundColor: "orange", color: "black", position: "absolute", bottom: "10px", left: 380 }}
                    >ADD BOOK
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBook;