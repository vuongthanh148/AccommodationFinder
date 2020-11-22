import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons';
import logo from '../image/logo_ngang_trang.png';
import { FaPhone } from 'react-icons/fa';
import "../css/Navbar.css";
import "../css/unikit.css"

class Navbar extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Bar changeState = {this.props.changeState}/>
    );
  }
}

export default Navbar;

class Bar extends Component {
  render(){
    return(
      <div className="ev-header-1 ev-topnav uk-section-primary">
      {/* TOP NAVBAR */}
          <nav className="uk-navbar-container uk-navbar-transparent uk-navbar">
            <div className="uk-navbar-left">
              <NavLink className="uk-logo" activeStyle={{color:'#fff'}} to="/home"><img className="ev-logo" src={logo}/></NavLink>
              {/* <a className="uk-logo" href="index.html">
                <img src={logo} />
              </a> */}
            </div>
            <div className="uk-navbar-right">
              <ul className="uk-subnav uk-subnav-divider navbar-right-element">
                <li>
                  <NavLink  activeStyle={{color:'#fff'}} to="/home">Trang chủ</NavLink>
                </li>
                <li>
                  <NavLink  activeStyle={{color:'#fff'}} to="/login" onClick = {this.props.changeState}>Đăng nhập</NavLink>
                </li>
                <li>
                <NavLink  activeStyle={{color:'#fff'}} to="/signup" onClick = {this.props.changeState}>Đăng ký</NavLink>
                </li>
              </ul>
            </div>
          </nav>
    </div>
  )
  }
    
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

