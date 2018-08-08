import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom';
import api from '../utils/requests';
import Notifier, {notify} from "./notifier";

const register_url = 'auth/register';

const inputStyles = {
    marginLeft: '4%',
    marginRight: '4%',
    width: '400px'
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            messages: "",
            errors: "",
            confirm_password: "",
        }

    }

    sendRegisterInfo = () => {
        api.post(register_url, {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        }).then(res=>{
            this.setState({messages: res.data.msg});
            notify({message: this.state.messages, variant: 'success'}, ()=>{this.props.history.push('/login')});
        }).catch(err=>{
            this.setState({errors: (err.response.data.msg === undefined ? `${err}`: err.response.data.msg)});
            notify({message: this.state.errors, variant: 'error'});
            console.log(err)
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.sendRegisterInfo();
    };

    handleChange = name => (event) => {
        this.setState({[name]: event.target.value})
    };

    render () {
        return (
            <Paper style={{margin: '5% auto 5% auto', width: 400, height: 480}}>
                <Typography variant={'headline'} component={'h2'} style={{paddingTop: '3%', textAlign: 'center'}}>
                    Sign Up for Hello Books
                </Typography>
                <form onSubmit={this.handleSubmit} noValidate style={{display: 'flex', flexWrap: 'wrap'}}>
                    <TextField
                        style={inputStyles}
                        required
                        id="first-name"
                        label="First Name"
                        placeholder="First Name"
                        value={this.state.first_name}
                        onChange={this.handleChange('first_name')}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        required
                        id="last-name"
                        label="Last Name"
                        placeholder="Last Name"
                        value={this.state.last_name}
                        onChange={this.handleChange('last_name')}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        required
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
                        required
                        id="password"
                        label="Password"
                        placeholder="Enter a password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                    />
                    <TextField
                        style={inputStyles}
                        type={'password'}
                        required
                        id="confirm-password"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={this.state.confirm_password}
                        onChange={this.handleChange('confirm_password')}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant={'extendedFab'}
                        color={'primary'}
                        style={{margin: '4% auto 0% auto', backgroundColor: 'orange', color: 'black'}}
                    >SIGN UP
                    </Button>
                </form>
                <Notifier/>
            </Paper>
        )
    }
}

export default withRouter(Register);