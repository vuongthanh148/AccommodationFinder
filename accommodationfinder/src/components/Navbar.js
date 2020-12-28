import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom';
import logo from '../image/logo_ngang_trang.png';
import NavbarMobile from './NavbarMobile';
import '../css/Navbar.css';
import avatar from '../image/avatar.png';
import { Icon, InlineIcon } from '@iconify/react';
import chevronDown from '@iconify-icons/fa-solid/chevron-down';
import chevronUp from '@iconify-icons/fa-solid/chevron-up';
import envelope from '@iconify-icons/fa-solid/envelope';
import bell from '@iconify-icons/fa-solid/bell';
import axios from 'axios';
import Chatbox from '../page/chat/Chatbox/Chatbox';
import { Redirect } from 'react-router';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className='display-nav'>
                    <Bar
                        isLoggedIn={this.props.isLoggedIn}
                        userData={this.props.userData}
                        updateLoginState={this.props.updateLoginState}
                    />
                </div>
                <div className='display-moblie-nav'>
                    <NavbarMobile
                        isLoggedIn={this.props.isLoggedIn}
                        userData={this.props.userData}
                    />
                </div>
            </div>
        );
    }
}

export default Navbar;

class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: chevronDown,
            divAppearance: 'none',
            name: 'dcmm',
        };
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    changeState = () => {
        if (this.state.divAppearance === 'none') {
            this.setState({
                divAppearance: 'block',
                icon: chevronUp,
            });
        } else {
            this.setState({
                divAppearance: 'none',
                icon: chevronDown,
            });
        }
    };

    handleLogOut = async () => {
        const token = localStorage.getItem('token');
        await axios({
            method: 'POST',
            url: `https://accommodation-finder.herokuapp.com/${this.props.userData.userType}/logoutAll`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        this.props.updateLoginState({}, false);
        localStorage.removeItem('token');
    };

    handleChat = async () => {
        let statusCode = 0;
         await axios
            .post(`http://localhost:3002/createChatbox`, {
                _id: this.props.userData._id,
                name: this.props.userData.name,
                role: localStorage.getItem('userType'),
            })
            .then((res) => {
                console.log(res.status);
                statusCode = res.status
                
            });
            if (statusCode === 200) {
                console.log("moved");
                location.href = "/chat"
            }
    };

<<<<<<< HEAD
    render() {
        console.log(this.props.userData);
        return (
            <div className='ev-header-1 navbar-section-primary'>
                <nav className='navbar-container navbar-transparent navbar'>
                    <div className='navbar-left'>
                        <NavLink
                            className='navbar-logo'
                            activeStyle={{ color: '#fff' }}
                            to='/home'>
                            <img className='ev-logo' src={logo} />
                        </NavLink>
                    </div>
                    {!this.props.isLoggedIn && (
                        <div className='navbar-right'>
                            <ul className='navbar-subnav navbar-subnav-divider navbar-right-element'>
                                <li>
                                    <NavLink
                                        activeStyle={{ color: '#fff' }}
                                        to='/home'>
                                        Trang chủ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeStyle={{ color: '#fff' }}
                                        to='/login'>
                                        Đăng nhập
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeStyle={{ color: '#fff' }}
                                        to='/signup'>
                                        Đăng ký
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    )}
                    {this.props.isLoggedIn && (
                        <div className='navbar-right'>
                            <ul className='navbar-subnav navbar-subnav-divider navbar-right-element'>
                                <li>
                                    <NavLink
                                        activeStyle={{ color: '#fff' }}
                                        to='/home'>
                                        Trang chủ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeStyle={{ color: '#fff' }}
                                        to='/login'>
                                        Tạo bài viết
                                    </NavLink>
                                </li>
                                <li className='user-button'>
                                    <a
                                        href='#'
                                        className='click-button'
                                        onClick={this.changeState}>
                                        <img
                                            className='navbar1-avatar-user'
                                            src={this.props.userData.avatar}
                                        />
                                        <div className='navbar1-user-name'>
                                            {this.props.userData.name}
                                        </div>
                                        <span className='user-icon'>
                                            <Icon icon={this.state.icon} />
                                        </span>
                                    </a>
                                    <div
                                        className='user-navbar-dropdown'
                                        style={{
                                            display: this.state.divAppearance,
                                        }}>
                                        <ul className='user-nav user-navbar-dropdown-nav'>
                                            <li>
                                                <NavLink
                                                    activeStyle={{
                                                        color: '#fff',
                                                    }}
                                                    to='/profile'
                                                    onClick={this.changeState}>
                                                    Thông tin cá nhân
                                                </NavLink>
                                            </li>
                                            <li className='user-nav-divider'></li>
                                            <li onClick={this.handleLogOut}>
                                                <a>Đăng xuất</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                            <a>
                                <span className='icon-padding'>
                                    <Icon
                                        icon={envelope}
                                        className='icon-messeger'
                                        onClick={this.handleChat}
                                    />
                                </span>
                            </a>
                            <a>
                                <span className='icon-padding'>
                                    <Icon
                                        icon={bell}
                                        className='icon-notification'
                                    />
                                </span>
                            </a>
                        </div>
                    )}
                </nav>
            </div>
        );
    }
}
=======
  render(){
    //this.props.userData)
    return(
      <div className="ev-header-1 navbar-section-primary" >
        <nav className="navbar-container navbar-transparent navbar">
          <div className="navbar-left">
            <NavLink className="navbar-logo" activeStyle={{color:'#fff'}} to="/home"><img className="ev-logo" src={logo}/></NavLink>
          </div>
          {!this.props.isLoggedIn && <div className="navbar-right">
            <ul className="navbar-subnav navbar-subnav-divider navbar-right-element">
              <li>
                <NavLink  activeStyle={{color:'#fff'}} to="/home">Trang chủ</NavLink>
              </li>
              <li>
                <NavLink  activeStyle={{color:'#fff'}} to="/login" >Đăng nhập</NavLink>
              </li>
              <li>
              <NavLink  activeStyle={{color:'#fff'}} to="/signup" >Đăng ký</NavLink>
              </li>
            </ul>
          </div>}
          {this.props.isLoggedIn && <div className="navbar-right">
            <ul className="navbar-subnav navbar-subnav-divider navbar-right-element">
              <li>
                <NavLink  activeStyle={{color:'#fff'}} to="/home">Trang chủ</NavLink>
              </li>
              <li>
                <NavLink  activeStyle={{color:'#fff'}} to="/login">Tạo bài viết</NavLink>
              </li>
              <li className="user-button">
                <a href="#" className="click-button" onClick={this.changeState}>
                  <img className="navbar1-avatar-user" src={this.props.userData.avatar}/>
                  <div className="navbar1-user-name">{this.props.userData.name}</div> 
                  <span className="user-icon"><Icon icon={this.state.icon} /></span>
                </a>           
                <div className="user-navbar-dropdown" style={{display:this.state.divAppearance}}>
                  <ul className="user-nav user-navbar-dropdown-nav">
                    <li><NavLink  activeStyle={{color:'#fff'}} to="/profile" onClick={this.changeState}>Thông tin cá nhân</NavLink></li>
                    <li className="user-nav-divider"></li>
                    <li onClick={this.handleLogOut}><a>Đăng xuất</a></li>
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
>>>>>>> main
