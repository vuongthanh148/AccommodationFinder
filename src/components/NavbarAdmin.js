import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  withRouter,
} from 'react-router-dom'
import logo from '../image/logo_ngang_trang.png'
import '../css/Navbar.css'
import { Icon, InlineIcon } from '@iconify/react'
import chevronDown from '@iconify-icons/fa-solid/chevron-down'
import chevronUp from '@iconify-icons/fa-solid/chevron-up'
import envelope from '@iconify-icons/fa-solid/envelope'
import bell from '@iconify-icons/fa-solid/bell'
import Chatbox from '../page/chat/Chatbox/Chatbox'
import { Redirect } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class NavbarAdmin extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="display-nav">
          <Bar />
        </div>
      </div>
    )
  }
}

export default NavbarAdmin

class Bar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: chevronDown,
      divAppearance: 'none',
      name: 'dcmm',
    }
  }

  changeState = () => {
    if (this.state.divAppearance === 'none') {
      this.setState({
        divAppearance: 'block',
        icon: chevronUp,
      })
    } else {
      this.setState({
        divAppearance: 'none',
        icon: chevronDown,
      })
    }
  }

  handleChat = () =>{
    location.href = '/admin/chat'
  }

  render() {
    return (
      <div className="ev-header-1 navbar-section-primary">
        <nav className="navbar-container navbar-transparent navbar">
          <div className="navbar-left">
            <NavLink
              className="navbar-logo"
              activeStyle={{ color: '#fff' }}
              to="/"
            >
              <img className="ev-logo" src={logo} />
            </NavLink>
          </div>
          <div className="navbar-right">
            <ul className="navbar-subnav navbar-subnav-divider navbar-right-element">
              <li>
                <NavLink activeStyle={{ color: '#fff' }} to="/">
                  Trang chủ
                </NavLink>
              </li>
              <li className="user-button">
                <a href="#" className="click-button" onClick={this.changeState}>
                  <img
                    className="navbar1-avatar-user"
                    src={'https://i.imgur.com/fTZerDj.png'}
                  />
                  <div className="navbar1-user-name">ADMIN</div>
                  <span className="user-icon">
                    <Icon icon={this.state.icon} />
                  </span>
                </a>
                <div
                  className="user-navbar-dropdown"
                  style={{ display: this.state.divAppearance }}
                >
                  <ul className="user-nav user-navbar-dropdown-nav">
                    <li onClick={this.handleLogOut}>
                      <a>Đăng xuất</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            <a>
              <span className="icon-padding">
                <Icon
                  icon={envelope}
                  className="icon-messeger"
                  onClick={this.handleChat}
                />
              </span>
            </a>
            <a>
              <span className="icon-padding">
                <Icon icon={bell} className="icon-notification" />
              </span>
            </a>
          </div>
        </nav>
      </div>
    )
  }
}
