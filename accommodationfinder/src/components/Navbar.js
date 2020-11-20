import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons';

import "../css/Homepage.css";
// import IndexLink from "react-router";

class Navbar extends Component {
  render() {
    return (
      <div>
        <Bar />
      </div>
    );
  }
}

export default Navbar;


function Bar() {
  return(
      <div className="bar-container">
          {/* TOP NAVBAR */}
          <div className="top-navbar">
            <div className="top-container">
              <div className="navbar-container">
                <div className="top-bar-left">
                  <ul className="bar-list-icon">
                    <li>
                      <a href="http://"><FontAwesomeIcon icon={faFacebookF} /></a>
                    </li>
                    <li>
                      <a href="http://"><FontAwesomeIcon icon={faTwitter} /></a>
                    </li>
                    <li>
                      <a href="http://"><FontAwesomeIcon icon={faYoutube} /></a>
                    </li>
                    <li>
                      <a href="http://"><FontAwesomeIcon icon={faInstagram} /></a>
                    </li>
                  </ul>
                </div>
                <div className="top-bar-right">
                  <ul className="list-items">
                    <li>
                      <NavLink  activeStyle={{color:'#fff'}} to="/home">Trang chủ</NavLink>
                    </li>
                    <li>
                      <NavLink  activeStyle={{color:'#fff'}} to="/login">Đăng nhập</NavLink>
                    </li>
                    <li>
                      <a href="http://">Đăng ký</a>
                    </li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
      </div>
  )
};

{/* <nav>
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
        </nav> */}