import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
// import Navbar from 'react-bootstrap/Navbar';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Macrocontainer from "./components/macrocontainer";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {

    return (
      <div className="App">
        <DndProvider backend={HTML5Backend}>
          <Router >
            <Switch>
              <Route
                exact path="/"
                render={() =>
                  <Login
                    updateUser={this.updateUser}
                  />} />
              <Route
                exact path="/signup"
                render={() =>
                  <Signup updateUser={this.updateUser} loggedIn={this.state.loggedIn} />} />
              <Route
                exact path="/macrohome"
                render={() =>
                  <Macrocontainer updateUser={this.updateUser} loggedIn={this.state.loggedIn} />} />
            </Switch>
          </Router>
        </DndProvider>
      </div >
    )
  }
}

export default App;
