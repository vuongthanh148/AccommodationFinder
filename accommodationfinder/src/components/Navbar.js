import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
// import IndexLink from "react-router";

class Navbar extends Component {
  render() {
    return (
      <div>
        this is navbar
        <nav>
          <ul>
            <li>
              <NavLink  activeStyle={{color:'#53acff'}} to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink  activeStyle={{color:'#53acff'}} to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink  activeStyle={{color:'#53acff'}} to="/post">Create new Post</NavLink>
            </li>
            <li>
              <NavLink  activeStyle={{color:'#53acff'}} to="/profile">My profile</NavLink>
            </li>
          </ul>
        </nav>
        end navbar
      </div>
    );
  }
}

export default Navbar;