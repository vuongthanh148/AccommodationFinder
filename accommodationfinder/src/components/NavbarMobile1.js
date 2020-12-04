import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { Icon, InlineIcon } from '@iconify/react';
import bars from '@iconify-icons/fa-solid/bars';
import search from '@iconify-icons/fa-solid/search';
import user from '@iconify-icons/fa-solid/user';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import logo from '../image/logo_ngang_trang.png';
import logo_den from "../image/logo_ngang.png";
import "../css/NavbarMobile1.css";
import avatar from "../image/avatar.png";


// NavbarMobile: max-width: 640px
class NavbarMobile1 extends Component {
  constructor(props) {
    super(props); 

    this.state= {
      sideBar: "false",
      className: "ev-sidemenu",
      barRight: "sidemenu-right"
    };
  }
  changeState = () => {
    if(this.state.sideBar === "true") {
      this.setState({
        sideBar: "false",
        className: "ev-sidemenu",
        barRight: "sidemenu-right"
      })
    }
    else{
      this.setState({
        sideBar: "true",
        className: "ev-sidemenu active",
        barRight: "sidemenu-right active"
      })
    }     
  }
  render() {
    return (
      <>
      <nav className="ev-mobile-nav mobile-navbar-container">
        <div className="mobile-navbar-left">
            <a className="mobile-button mobile-button-link ev-button" href="#sidemenu">
              <Icon icon={bars} onClick={this.changeState}/>
            </a>
        </div>
        <div className="mobile-navbar-center">
            <a className="mobile-navbar-item mobile-logo" href="#">
              <img alt="Image" src={logo_den}/>
            </a>
        </div>
        <div className="mobile-navbar-right">
            <a className="mobile-button mobile-button-link ev-button" href="#">
              <Icon icon={search} />
            </a>
        </div>
      </nav>
      <div className={this.state.className} id="sidemenu" uk-offcanvas="overlay: true;">

        <div className="sidebar-offcanvas-bar sidebar-section-primary sidebar-flex sidebar-flex-column">

          {/* <form className="sidebar-search sidebar-search-default">
            <Icon className='sidebar-search-icon' icon={search} />
            <input className="sidebar-search-input sidebar-border-rounded" type="search" placeholder="Tìm kiếm..." />
          </form> */}
            <div className="user-bar">
                <span><img className="avatar-user" src={avatar}/></span>
                <span className="user-name">Le Thi Hanh</span>
            </div>

          <hr />
          {/* <a href="#" className="ev-signin sidebar-button">
            <Icon icon={user} className="sidebar-margin-small-right"/>
            Đăng ký
          </a>
          <hr /> */}

          <p className="sidebar-nav-header">Main Menu</p>

          <ul className="ev-main-menu sidebar-nav-default sidebar-nav-parent-icon sidebar-margin-small-bottom">
              <li className="sidebar-parent">
                <a href="#">Trang chủ</a>
              </li>
              <li className="sidebar-parent">
                <a href="#">Tìm kiếm</a>
              </li>
              <li className="sidebar-parent">
                <a href="#">Danh sách phòng</a>
              </li>
              <li className="sidebar-parent">
                <a href="#">Profile</a>
              </li>
          </ul>

          <p className="sidebar-nav-header">Follow Us</p>

          <ul className="ev-followus sidebar-iconnav sidebar-margin-small-bottom">
            <li>
              <a href=""><FontAwesomeIcon icon = {faFacebookF} style={{color:"white"}} /></a>
            </li>
            <li>
              <a href=""><FontAwesomeIcon icon = {faTwitter} style={{color:"white"}} /></a>
            </li>
            <li>
              <a href=""><FontAwesomeIcon icon = {faYoutube} style={{color:"white"}} /></a>
            </li>
            <li>
              <a href=""><FontAwesomeIcon icon = {faLinkedin} style={{color:"white"}} /></a>
            </li>
          </ul>
        </div>
        <div className={this.state.barRight} onClick={this.changeState}></div>
      </div>
      </> 
    );
  }
}

export default NavbarMobile1;