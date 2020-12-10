import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { Icon, InlineIcon } from '@iconify/react';
import chevronDown from '@iconify-icons/fa-solid/chevron-down';
import chevronUp from '@iconify-icons/fa-solid/chevron-up';
import envelope from '@iconify-icons/fa-solid/envelope';
import bell from '@iconify-icons/fa-solid/bell';
import logo from '../image/logo_ngang_trang.png';
import logo_den from "../image/logo_ngang.png";
import "../css/Navbar1.css";
import avatar from "../image/avatar.png";
import NavbarMobile1 from './NavbarMobile1';

class Navbar1 extends Component {
  render() {
    return (
      <div>
        <div className="display-nav1">
          <Bar />
        </div>       
        <div className="display-moblie-nav1">
          <NavbarMobile1 />
        </div>        
      </div>     
    );
  }
  
}

export default Navbar1;

class Bar extends Component {
  constructor(props) {
    super(props); 

    this.state= {
      divAppearance: "none",
      icon: chevronDown
    };
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
      <div className="ev-header-1 navbar1-section-primary">
      {/* TOP NAVBAR */}
        <nav className="navbar1-container navbar1-transparent navbar1">
          <div className="navbar1-left">
            <NavLink className="navbar1-logo" activeStyle={{color:'#fff'}} to="/home"><img className="ev-logo" src={logo}/></NavLink>
          </div>
          <div className="navbar1-right">
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
          </div>
        </nav>
    </div>
  )
  } 
}
