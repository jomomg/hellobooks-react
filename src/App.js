import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './components/landing'
import SignUp from './components/signup'
import BookPage from './components/books'
import Auth from './utils/authentication'
import SignIn from './components/login'
import UserProfilePage from './components/user_profile'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

class App extends Component {
  render() {
     return (
         <React.Fragment>
             <Switch>
                 <Route path="/" exact component={LandingPage}/>
                 <Route path="/signup" component={SignUp}/>
                 <Route path="/signin" component={SignIn}/>
                 <Route path="/books" exact component={BookPage}/>
                 <PrivateRoute path="/profile" component={UserProfilePage}/>
                 {/*<Route path="/books/:id" component={SingleBookPage}/>*/}
             </Switch>
         </React.Fragment>
     )
  }
}

export default App;
