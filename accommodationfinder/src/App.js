import React, { Component } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Post from "./components/Post";
import Signup from "./components/Signup";
import SignupOwner from "./components/SignupOwner";
import SignupRenter from "./components/SignupRenter";
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Navbar1 from "./components/Navbar1";
import Profile from './components/Profile';


class App extends Component {
  constructor() {
    super();
    this.state = {
      navbar: true,
      isLoggedIn: false,
      userData: {}
    }
    this.changeNavbarState = this.changeNavbarState.bind(this);
    this.updateLoginState = this.updateLoginState.bind(this);
  }

  updateLoginState = function(userData, isLoggedIn, event){
    this.setState({
      userData: userData,
      isLoggedIn: isLoggedIn
    })
    if(event){}
  }

  changeNavbarState = function(newState, event){
    this.setState({
      navbar: newState,
    })
    if(event){}
  }


  render() {
    return (
      // this.renderedScreen(this.state.screen)
      <Router>
          {this.state.navbar? <Navbar updateLoginState = {this.updateLoginState} isLoggedIn ={this.state.isLoggedIn} userData={this.state.userData}  />: null}
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login changeNavbarState = {this.changeNavbarState} updateLoginState = {this.updateLoginState} isLoggedIn ={this.state.isLoggedIn} userData />
            </Route>
            <Route path="/signup">
              <Signup changeNavbarState = {this.changeNavbarState}/>
            </Route>
            <Route path="/signupOwner">
              <SignupOwner changeNavbarState = {this.changeNavbarState}/>
            </Route>
            <Route path="/signupRenter">
              <SignupRenter changeNavbarState = {this.changeNavbarState}/>
            </Route>
            <Route path="/post">
              <Post />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/home">
              <Home changeNavbarState = {this.changeNavbarState}/>
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
