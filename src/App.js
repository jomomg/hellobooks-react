import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import LandingPage from './components/landing'
import SignUp from './components/signup'
import BookPage from './components/books'
import SignIn from './components/login'


class App extends Component {
  render() {
     return (
         <React.Fragment>
             <Switch>
                 <Route path="/" exact component={LandingPage}/>
                 <Route path="/signup" component={SignUp}/>
                 <Route path="/signin" component={SignIn}/>
                 <Route path="/books" component={BookPage}/>
             </Switch>
         </React.Fragment>
     )
  }
}

export default App;
