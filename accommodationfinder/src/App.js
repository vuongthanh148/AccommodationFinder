import React, { Component } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Post from "./components/Post";
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from './components/Profile';


class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      // this.renderedScreen(this.state.screen)
      <Router>
          <Navbar />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/post">
              <Post />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default App;
