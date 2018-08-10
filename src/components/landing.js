import React from "react";
import "./css/landing.css";


const buttonStyle = {
    marginRight: "3px",
    marginLeft: "3px"
};

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
                    <a className="btn-flat orange" href="/login" style={buttonStyle}>SIGN IN</a>
                    <a className="btn-flat orange" href="/register" style={buttonStyle}>SIGN UP</a>
                    <span>or</span>
                    <a className="btn-flat orange" href="/books" style={buttonStyle}>SEE ALL OUR BOOKS</a>
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
