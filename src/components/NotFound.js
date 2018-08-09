import React from "react";
import {Route} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";

/**
 * 404 page
 */
const NotFound = () => {
    return (
        <div style={{textAlign: "center"}}>
            <ErrorIcon style={{color: "red", height: 300, width: 300, margin: "auto"}} />
            <Typography variant="display3" style={{color: "white"}}>
            404
            </Typography>
            <Typography variant="display3" style={{color: "white"}}>
            Sorry, Not found
            </Typography>
            <Route render={({ history }) => (
                <Button
                    style={{backgroundColor: "orange"}}
                    onClick={()=>history.push("/")}>
                Go Home
                </Button>
            )}/>
        </div>
    );
};

export default NotFound;