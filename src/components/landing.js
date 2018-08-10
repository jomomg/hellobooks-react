import React from "react";
import Button from "@material-ui/core/Button";
import { Route } from "react-router-dom";
import "./css/landing.css";


/**
 * Main landing page. This is the page the user encounters
 * when they visit the site.
 */
const LandingPage = () => {
    return (
        <React.Fragment>
            <div style={{backgroundColor: "teal", margin: "0"}}>
                <div className="container">
                    <br/>
                </div>
            </div>
            <div style={{backgroundColor: "teal", margin: "0"}}>
                <div className="container">
                    <p className="logo">Hello Books</p>
                    <Route render={({ history }) => (
                        <Button style={{backgroundColor: "orange", marginRight: 5}} onClick={()=>history.push("/login")}>
                        SIGN IN
                        </Button>
                    )} />
                    <Route render={({ history }) => (
                        <Button style={{backgroundColor: "orange", marginRight: 5}} onClick={()=>history.push("/register")}>
                        SIGN UP
                        </Button>
                    )} />
                    <span style={{color: "white", fontFamily: "Courier New", fontStyle: "bold"}}>or</span>
                    <Route render={({ history }) => (
                        <Button style={{backgroundColor: "orange", marginLeft: 5}} onClick={()=>history.push("/books")}>
                            SEE ALL OUR BOOKS
                        </Button>
                    )} />
                </div>
            </div>
            <footer className="page-footer teal">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h4 className="white-text">Welcome to Hello Books</h4>
                            <h5 className="grey-text text-lighten-4">
                               Here you can borrow a book or two from our collection, enjoy it,
                               return it, and repeat the process
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                       © 2018 Jomo Gitau
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default LandingPage;
