import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Route, withRouter} from 'react-router-dom'
import Auth from '../utils/authentication';
import api from '../utils/requests';



class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = ()=> {
        this.setState({ anchorEl: null });
        Auth.logout();
        api.post('auth/logout')
            .then(res => console.log(res))
            .catch(err => console.log(err.response.data))
            .then(()=>{this.props.history.push('/')})
    };

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <AppBar style={{backgroundColor: 'teal'}} position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" style={{flexGrow: 1}}>
                            {this.props.title}
                        </Typography>
                            <div>
                                {!Auth.isAuthenticated ?
                                    <Route render={({ history }) => (
                                        <Button onClick={()=>{history.push('/login')}} color="inherit">Login</Button>
                                    )} /> :
                                <React.Fragment>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <Route render={({ history }) => (
                                        <MenuItem onClick={()=>history.push('/profile')}>My profile</MenuItem>
                                    )}/>
                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                    {Auth.isAdmin() && (
                                        <div>
                                            <MenuItem disabled={true} onClick={this.handleClose}>Admin</MenuItem>
                                            <Route render={({ history }) => (
                                                <MenuItem onClick={()=>history.push('/admin')}>Dashboard</MenuItem>
                                            )}/>
                                        </div>
                                        )}

                                </Menu>
                                </React.Fragment>
                                }
                            </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withRouter(TopNav);

