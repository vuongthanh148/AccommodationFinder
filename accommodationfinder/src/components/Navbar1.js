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
          
        </nav>
    </div>
  )
  } 
}
