import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
// import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import { faFacebookF, faTwitter, faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons';
import logo from '../image/logo_ngang_trang.png';
// import { FaPhone } from 'react-icons/fa';
import NavbarMobile from './NavbarMobile';
import "../css/Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="display-nav">
          <Bar />
        </div>       
        <div className="display-moblie-nav">
          <NavbarMobile />
        </div>        
      </div> 
    );
  }
}

export default Navbar;

class Bar extends Component {
  render(){
    return(
      <div className="ev-header-1 navbar-section-primary">
      {/* TOP NAVBAR */}
        <nav className="navbar-container navbar-transparent navbar">
          <div className="navbar-left">
            <NavLink className="navbar-logo" activeStyle={{color:'#fff'}} to="/home"><img className="ev-logo" src={logo}/></NavLink>
          </div>
          <div className="navbar-right">
            <ul className="navbar-subnav navbar-subnav-divider navbar-right-element">
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