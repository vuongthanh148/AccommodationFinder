import React, { Component } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Post from "./components/Post";
import Signup from "./components/Signup"
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from './components/Profile';


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
          {this.state.navbar? <Navbar />: null}
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login changeState = {this.changeState} />
            </Route>
            <Route path="/signup">
              <Signup changeState = {this.changeState} />
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
