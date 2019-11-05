import React, { Component } from "react";
import axios from "axios"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: "",
    };
  }



  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorText: ""
    })
  }

  handleSubmit = (e) => {
    axios
      .post("https://tutor-app-capstone.herokuapp.com/api/login",
        {
          auth: {
            email: this.state.email,
            password: this.state.password,
          }
        },
        { loggedIn: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulLogin();
          this.props.history.push('/find-a-tutor')
        } else {
          this.props.handleUnsuccessfulLogin();
        }
      }).catch(err => {
        this.setState({
          errorText: "Incorrect email or password"
        })
      })

    e.preventDefault();
  }



  render() {
    return (
      <div className="login-wrapper">
        <h1>Sign In</h1>


        <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit} className="login-input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Login</button>
          </div>
        </form>

        <div className="create-account-link">
          <a href="/create-account">Create an acount</a>
        </div>

      </div>
    );
  }
}
export default Login;
