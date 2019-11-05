import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FindTutor from "./find-tutor";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  getCredentials = () => {
    axios
      .get("https://tutor-app-capstone.herokuapp.com/api/login", {
        loggedIn: true
      })
      .then(response => {
        this.setState({
          name: response.data.auth.name,
          loggedIn: response.data.loggedIn

        })
      })
      .catch(error => {
        console.log("Credentials Error", error)
      })


  }
  render() {
    return (
      <div className="home-page-wrapper">
        <h1>Find a tutor that works with your schedule!</h1>
        <h2>Register today and get your first session free!</h2>

        <a href="/find-a-tutor" className="find-tutor-link-button">Find a Tutur</a>


      </div >
    );
  }
}

export default Home;
