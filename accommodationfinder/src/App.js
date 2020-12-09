import React, { Component } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Post from "./components/Post";
import Signup from "./components/Signup";
import SignupOwner from "./components/SignupOwner";
import SignupNonowner from "./components/SignupNonowner";
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Navbar1 from "./components/Navbar1";
import NavbarMobile from "./components/NavbarMobile";
import NavbarMobile1 from "./components/NavbarMobile1";
import Profile from "./components/Profile"


class App extends Component {
  constructor() {
    super();
    this.state = {
      navbar: true,
    }
    this.changeState = this.changeState.bind(this);
  }

  changeState = function(newState, event){
    this.setState({
      navbar: newState,
    })
    if(event){}
  }

  render() {
    return (
      // this.renderedScreen(this.state.screen)
      <Router>
          {this.state.navbar? <NavbarMobile1 />: null}
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login changeState = {this.changeState} />
            </Route>
            <Route path="/signup">
              <Signup changeState = {this.changeState} />
            </Route>
            <Route path="/signupOwner">
              <SignupOwner changeState = {this.changeState} />
            </Route>
            <Route path="/signupNonowner">
              <SignupNonowner changeState = {this.changeState} />
            </Route>
            <Route path="/post">
              <Post />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/home">
              <Home changeState = {this.changeState} />
            </Route>
            <Route path="/">
               <Redirect to="/home"/>
            </Route>
          </Switch>
      </Router>
    );
  }

}

export default App;
