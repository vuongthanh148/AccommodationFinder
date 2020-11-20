import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons';
import logo from '../image/logo_ngang_trang.png';
import { FaPhone } from 'react-icons/fa';
import "../css/Navbar.css";
import "../css/unikit.css"

class Navbar extends Component {
  render() {
    return (
      <Bar />
    );
  }
}

export default Navbar;

function Bar() {
  return(
    <div className="ev-header-1 uk-visible@m">
      {/* TOP NAVBAR */}
      <div className="ev-topnav uk-section-primary uk-padding-small">
        <div className="ev-container">
          <nav className="uk-navbar-container uk-navbar-transparent uk-navbar">
            <div className="uk-navbar-left">
              <a className="uk-logo" href="index.html">
                <img src={logo} />
              </a>
            </div>

            <div className="uk-navbar-right">
              <ul className="uk-subnav uk-subnav-divider">
                <li>
                  <NavLink  activeStyle={{color:'#fff'}} to="/home">Trang chủ</NavLink>
                </li>
                <li>
                  <NavLink  activeStyle={{color:'#fff'}} to="/login">Đăng nhập</NavLink>
                </li>
                <li><a href="#">Đăng ký</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

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

