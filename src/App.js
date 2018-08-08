import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './components/landing'
import Register from './components/register'
import BookPage from './components/books'
import Auth from './utils/authentication'
import Login from './components/login'
import UserProfilePage from './components/user_profile'
import SingleBookPage from './components/single_book'
import AdminPage from './components/admin'
import EditBook from './components/edit_book'
import NotFound from './components/NotFound'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
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
                 <Route path="/register" component={Register}/>
                 <Route path="/login" component={Login}/>
                 <Route path="/books" exact component={BookPage}/>
                 <Route path="/books/:id" component={SingleBookPage}/>
                 <PrivateRoute path="/admin" component={AdminPage}/>
                 <PrivateRoute path="/profile" component={UserProfilePage}/>
                 <PrivateRoute path="/edit/:id" component={EditBook}/>
                 <Route component={NotFound}/>
             </Switch>
         </React.Fragment>
     )
  }
}

export default App;
