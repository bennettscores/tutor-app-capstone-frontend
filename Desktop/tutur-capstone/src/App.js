import React from "react";
import "./styles/main.scss";

import Navbar from "./components/Navabar";
import Login from "./components/pages/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FindTutor from "./components/pages/find-tutor";
import CreateAccount from "./components/pages/create-account";
import Home from "./components/pages/home";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      Role: ""
    }
  }

  handleSuccessfulLogin = () => {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }


  render() {

    return (
      <div className="App">
        <Router>
          <div className="Navbar-wrapper">
            <Navbar
              loggedInStatus={this.state.loggedInStatus}
              handleLogout={this.handleLogout}
            />
            <Switch>
              <Route path="/login" render={props => (
                <Login
                  {...props}
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                />
              )}
              />
              <Route exact path="/" render={props => (
                <Home
                  {...props} loggedin={this.state.loggedInStatus} />
              )} />
              <Route path="/find-a-tutor" render={props => (
                <FindTutor
                  {...props} loggedin={this.state.loggedInStatus} />
              )} />
              <Route path="/create-account" component={CreateAccount} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
