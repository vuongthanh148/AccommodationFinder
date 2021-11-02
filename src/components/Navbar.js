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
import NavbarMobile from './NavbarMobile'
import '../css/Navbar.css'
import avatar from '../image/avatar.png'
import { Icon, InlineIcon } from '@iconify/react'
import chevronDown from '@iconify-icons/fa-solid/chevron-down'
import chevronUp from '@iconify-icons/fa-solid/chevron-up'
import envelope from '@iconify-icons/fa-solid/envelope'
import bell from '@iconify-icons/fa-solid/bell'
import Chatbox from '../page/chat/Chatbox/Chatbox'
import { Redirect } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleLogout } from '../apis/user'
import { createChatbox } from '../apis/chat'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className="display-nav">
          <Bar
            isLoggedIn={this.props.isLoggedIn}
            userData={this.props.userData}
            updateLoginState={this.props.updateLoginState}
            userType={localStorage.getItem('userType')}
          />
        </div>
        <div className="display-moblie-nav">
          <NavbarMobile
            isLoggedIn={this.props.isLoggedIn}
            userData={this.props.userData}
          />
        </div>
      </div>
    )
  }
}

export default Navbar

class Bar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: chevronDown,
      divAppearance: 'none',
      name: 'dcmm',
    }
    this.handleLogOut = this.handleLogOut.bind(this)
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

  handleLogOut = async () => {
    const token = localStorage.getItem('token')
    toast.info('Đang thực hiện yêu cầu đăng xuất', {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
    await handleLogout({userType: this.props.userData.userType})
    this.props.updateLoginState({}, false)
    localStorage.removeItem('token')
    location.href = '/'
  }

  handleChat = async () => {
    let statusCode = 0
    const res = await createChatbox({
      _id: this.props.userData._id,
      name: this.props.userData.name,
      avatar: this.props.userData.avatar,
      role: localStorage.getItem('userType'),
    })
    if(res){
      console.log(res.status)
      statusCode = res.status
    }
    if (statusCode === 200) {
      console.log('moved')
      location.href = '/chat'
    }
  }

  render() {
    console.log(this.props.userData)
    return (
      <div className="ev-header-1 navbar-section-primary">
        <nav className="navbar-container navbar-transparent navbar">
          <div className="navbar-left">
            <NavLink
              className="navbar-logo"
              activeStyle={{ color: '#fff' }}
              to="/home"
            >
              <img className="ev-logo" src={logo} />
            </NavLink>
          </div>
          {!this.props.isLoggedIn && (
            <div className="navbar-right">
              <ul className="navbar-subnav navbar-subnav-divider navbar-right-element">
                <li>
                  <NavLink activeStyle={{ color: '#fff' }} to="/home">
                    Trang chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink activeStyle={{ color: '#fff' }} to="/login">
                    Đăng nhập
                  </NavLink>
                </li>
                <li>
                  <NavLink activeStyle={{ color: '#fff' }} to="/signup">
                    Đăng ký
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {this.props.isLoggedIn && (
            <div className="navbar-right">
              <ul className="navbar-subnav navbar-subnav-divider navbar-right-element">
                <li>
                  <NavLink activeStyle={{ color: '#fff' }} to="/home">
                    Trang chủ
                  </NavLink>
                </li>
                {this.props.userType === 'owner' && <li>
                  <NavLink activeStyle={{ color: '#fff' }} to="/newpost">
                    Tạo bài viết
                  </NavLink>
                </li>}
                <li className="user-button">
                  <a
                    href="#"
                    className="click-button"
                    onClick={this.changeState}
                  >
                    <img
                      className="navbar1-avatar-user"
                      src={this.props.userData.avatar}
                    />
                    <div className="navbar1-user-name">
                      {this.props.userData.name}
                    </div>
                    <span className="user-icon">
                      <Icon icon={this.state.icon} />
                    </span>
                  </a>
                  <div
                    className="user-navbar-dropdown"
                    style={{ display: this.state.divAppearance }}
                  >
                    <ul className="user-nav user-navbar-dropdown-nav">
                      <li>
                        <NavLink
                          activeStyle={{ color: '#fff' }}
                          to="/profile"
                          onClick={this.changeState}
                        >
                          Thông tin cá nhân
                        </NavLink>
                      </li>
                      <li className="user-nav-divider"></li>
                      <li onClick={this.handleLogOut}>
                        <a>Đăng xuất</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              {this.props.userType === 'owner' && (
                <a>
                  <span className="icon-padding">
                    <Icon
                      icon={envelope}
                      className="icon-messeger"
                      onClick={this.handleChat}
                    />
                  </span>
                </a>
              )}
              <a>
                <span className="icon-padding">
                  <Icon icon={bell} className="icon-notification" />
                </span>
              </a>
            </div>
          )}
        </nav>
      </div>
    )
  }
}
