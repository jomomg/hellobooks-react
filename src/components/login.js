import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import api from "../utils/requests";
import Auth from '../utils/authentication';
import { Redirect } from 'react-router-dom';

const login_url = '/auth/login';
const inputStyles = {
    marginLeft: '4%',
    marginRight: '4%',
    width: '400px'
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirectToReferrer: false
        }

    }

    sendLoginInfo = async() => {
        try {
            const response = await api.post(login_url, {
                email: this.state.email,
                password: this.state.password,
            });
            console.log(response);
            if (response.status === 200) {
                Auth.authenticate();
                const accessToken = response.data.access_token;
                localStorage.setItem('accessToken', accessToken);
                this.setState({redirectToReferrer: true});
            } else {

            }
        } catch (e) {
            console.log(e)
        }
    };

    handleClick = () => {
        this.sendLoginInfo();
    };

    handleChange = name => (event) => {
        this.setState({[name]: event.target.value})
    };

    render() {
        const { from } = this.props.location.state || { from : {pathname: '/books'}};
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={ from } />
        }

        return (
            <Paper style={{margin: '5% auto 5% auto', width: 400, height: 280}}>
                <Typography variant={'headline'} component={'h2'} style={{paddingTop: '3%', textAlign: 'center'}}>
                    Login to Hello Books
                </Typography>
            <form style={{display: 'flex', flexWrap: 'wrap'}}>
                <TextField
                    style={inputStyles}
                    type={'email'}
                    id="email"
                    label="Email"
                    placeholder="Your email address"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                />
                <TextField
                    style={inputStyles}
                    type={'password'}
                    id="password"
                    label="Password"
                    placeholder="Enter a password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <Button
                    onClick={this.handleClick}
                    variant={'extendedFab'}
                    color={'primary'}
                    style={{margin: '4% auto 0% auto', backgroundColor: 'orange', color: 'black'}}
                >LOGIN
                </Button>
            </form>
            </Paper>
        )
    }
}

export default Login;
