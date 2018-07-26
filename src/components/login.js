import React, { Component } from 'react'
import './css/login.css'
import {Row, Input} from 'react-materialize'
import axios from "axios/index";
import Auth from '../utils/authentication'

const login_url = 'https://hello-kitabu.herokuapp.com/api/v1/auth/login';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }

    }

    sendLoginInfo = async() => {
        try {
            const response = await axios.post(login_url, {
                email: this.state.email,
                password: this.state.password,
                success: false,
            });
            console.log(response);
            if (response.status === 200) {
                Auth.authenticate();
                const accessToken = response.data.access_token;
                localStorage.setItem('accessToken', accessToken);
                const success = true;
                this.setState({success});
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
