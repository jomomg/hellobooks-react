import React, { Component } from 'react'
import './css/signup.css'
import {Row, Input, Button} from 'react-materialize'
import axios from 'axios'

const register_url = 'https://hello-kitabu.herokuapp.com/api/v1/auth/register';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            "confirm password": "",
        }

    }

    sendRegisterInfo = async() => {
        try {
            const response = await axios.post(register_url, {
                email: this.state.email,
                password: this.state.password,
                "confirm password": this.state["confirm password"]
            });
            console.log(response);
        } catch (e) {
            console.log(e)
        }
    };

    handleClick = () => {
        this.sendRegisterInfo();
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    render () {
        return (
            <div className="signup-form z-depth-3">
                <div className="form-contents">
                <Row>
                    <h5 style={{textAlign: 'center'}}>Sign up for HelloBooks</h5>
                    <div style={{margin: '10px'}}>
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
                        <Input
                            name="confirm password"
                            type="password"
                            label="Confirm password"
                            s={12}
                            value={this.state["confirm password"]}
                            onChange={this.handleChange}/>
                        <div style={{textAlign: 'center'}}>
                        <button
                            onClick={this.handleClick}
                            className="btn waves-effect waves-light"
                            type="submit"
                            name="submit">SIGN UP</button>
                        </div>
                    </div>
                </Row>
                </div>
            </div>
        )
    }
}

export default SignUp;