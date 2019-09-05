import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import axios from "axios";

import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      redirectTo: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //request to server to add a new username/password
    axios
      .post("/api", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          // console.log({ props: this.props });
          // this.props.history.push("/login");
          this.setState({
            //redirect to login page
            redirectTo: "/"
          });
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <div>
        <Navbar>
          <h1>PRIORITIZE</h1>
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  List Placeholder
                </a>
              </li>
            </ul>
          </div>
        </Navbar>
        <Jumbotron>
          <h3>"Signup page"</h3>
          <div className="SignupForm">
            <h4>Make an account</h4>
            <form className="form-horizontal">
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="password">
                    Password:{" "}
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group ">
                <div className="col-7"></div>
                <button
                  className="btn btn-primary col-1 col-mr-auto"
                  onClick={this.handleSubmit}
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Signup;
