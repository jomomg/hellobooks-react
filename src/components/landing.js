import React, { Component } from 'react';
import './css/landing.css'


const buttonStyle = {
    marginRight: '3px',
    marginLeft: '3px'
};

const LandingPage = () => {
   return (
       <React.Fragment>
           <div style={{backgroundColor: 'teal', margin: '0'}}>
               <div className="container">
                   <br/>
               </div>
           </div>
           <div style={{backgroundColor: 'teal', margin: '0'}}>
               <div className="container">
                   <p className="logo">Hello Books</p>
                   <a className="btn-flat orange" href="/signin" style={buttonStyle}>SIGN IN</a>
                   <a className="btn-flat orange" href="/signup" style={buttonStyle}>SIGN UP</a>
                   <span>or</span>
                   <a className="btn-flat orange" href="/books" style={buttonStyle}>SEE ALL OUR BOOKS</a>
               </div>
           </div>
           <footer className="page-footer teal">
               <div className="container">
                   <div className="row">
                       <div className="col l6 s12">
                           <h5 className="white-text">Welcome to Hello Books</h5>
                           <p className="grey-text text-lighten-4">
                               Here you can borrow a book or two from our collection, enjoy it,
                               return it, and repeat the process
                           </p>
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
   )
};

export default LandingPage;
