import React, { Component } from 'react'
import './css/login.css'
import {Row, Input} from 'react-materialize'
import api from "../utils/requests";
import Auth from '../utils/authentication';
import { Redirect } from 'react-router-dom';

const login_url = '/auth/login';

class LoginForm extends Component {
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

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        const { from } = this.props.location.state || { from : {pathname: '/'}};
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={ from } />
        }

        return (
            <div className="login-form z-depth-3 ">
                <h5 style={{textAlign: 'center'}}>Sign In to HelloBooks</h5>
                <Row>
                    <Input
                        name="email"
                        type="email"
                        label="Email"
                        s={12}
                        value={this.state.email}
                        onChange={this.handleChange}/>
                    <Input
                        name="password"
                        type="password"
                        label="password"
                        s={12}
                        value={this.state.password}
                        onChange={this.handleChange}/>
                    <div style={{textAlign: 'center'}}>
                    <button
                        onClick={this.handleClick}
                        className="btn waves-effect waves-light"
                        type="submit"
                        name="submit">SIGN IN</button>
                    </div>
                </Row>
            </div>
        )
    }
}

export default LoginForm;
