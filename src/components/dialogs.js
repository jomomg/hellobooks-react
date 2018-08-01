import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteDialog = (props) => {
        return (
            <div>
                <Dialog
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete Book</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are You sure you want to delete this book?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleYes} style={{backgroundColor: 'green', color: 'white'}}>
                            Yes
                        </Button>
                        <Button onClick={props.handleNo} color="primary" autoFocus style={{backgroundColor: 'red', color: 'white'}}>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
};

export default DeleteDialog;