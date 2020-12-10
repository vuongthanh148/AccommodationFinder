import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import logo from '../image/logo_ngang_trang.png';
import NavbarMobile from './NavbarMobile';
import "../css/Navbar.css";
import avatar from "../image/avatar.png";
import { Icon, InlineIcon } from '@iconify/react';
import chevronDown from '@iconify-icons/fa-solid/chevron-down';
import chevronUp from '@iconify-icons/fa-solid/chevron-up';
import envelope from '@iconify-icons/fa-solid/envelope';
import bell from '@iconify-icons/fa-solid/bell';
import logo_den from "../image/logo_ngang.png";

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = ({
      loggedIn: false
    })
  }
  render() {
    return (
      <div>
        <div className="display-nav">
          <Bar loggedIn={this.state.loggedIn}/>
        </div>       
        <div className="display-moblie-nav">
          <NavbarMobile loggedIn={this.state.loggedIn}/>
        </div>        
      </div> 
    );
  }
}

export default Navbar;

class Bar extends Component {
  constructor(props){
    super(props)
    this.state = ({
      icon: chevronDown,
      divAppearance: "none",
    })
  }
  changeState = () => {
    console.log("click");
    if(this.state.divAppearance === "none") {
      this.setState({
        divAppearance: "block",
        icon:chevronUp
      })
    }
    else{
      this.setState({
        divAppearance: "none",
        icon:chevronDown
      })
    }     
  }

  render(){
    return(
      <div className="ev-header-1 navbar-section-primary">
      {/* TOP NAVBAR */}
        <nav className="navbar-container navbar-transparent navbar">
          <div className="navbar-left">
            <NavLink className="navbar-logo" activeStyle={{color:'#fff'}} to="/home"><img className="ev-logo" src={logo}/></NavLink>
          </div>
          {this.props.loggedIn === false && <div className="navbar-right">
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
          </div>}
          {this.props.loggedIn === true && <div className="navbar1-right">
            <ul className="navbar1-subnav navbar1-subnav-divider navbar1-right-element">
              <li>
                <NavLink  activeStyle={{color:'#fff'}} to="/home">Trang chủ</NavLink>
              </li>
              <li className="user-button">
                
                <a href="#" className="click-button" onClick={this.changeState}>
                  <img className="navbar1-avatar-user" src={avatar}/>
                  <div className="navbar1-user-name">Le Thi Hanh</div> 
                  <span className="user-icon"><Icon icon={this.state.icon} /></span>
                  
                </a>           
                <div className="user-navbar-dropdown" style={{display:this.state.divAppearance}}>
                  <ul className="user-nav user-navbar-dropdown-nav">
                    <li><NavLink  activeStyle={{color:'#fff'}} to="/profile" onClick={this.changeState}>Profile</NavLink></li>
                    <li className="user-nav-divider"></li>
                    <li onClick={this.changeState}><a>Dang xuat</a></li>
                  </ul>
                </div>               
              </li>
            </ul>
            <a>
              <span className="icon-padding"><Icon icon={envelope} className="icon-messeger"/></span>
            </a>
            <a>
              <span className="icon-padding"><Icon icon={bell} className="icon-notification"/></span>
            </a>
          </div>}
        </nav>
    </div>
  )
  }
    
}