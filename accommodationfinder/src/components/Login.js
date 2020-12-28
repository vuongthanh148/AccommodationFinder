import React, { useCallback, useEffect, useState, useContext } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { UserContext } from '../context/user.context'
import axios from 'axios'
import '../css/login.css'
import logo_trang from '../image/logo_ngang_trang.png'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [userType, setUserType] = useState('owner')
  const [userData, setUserData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const userContext = useContext(UserContext)

  useEffect(() => {
    props.changeNavbarState(false)
    //check if logged in so move to home
    setIsLoggedIn(props.isLoggedIn)
    setUserData(props.userData)
  }, [])

<<<<<<< HEAD
  async handleSubmit(event) {
    event.preventDefault();
    let url = "";
    this.state.userType === "owner"
      ? (url = "https://accommodation-finder.herokuapp.com/owner/login")
      : (url = "https://accommodation-finder.herokuapp.com/renter/login");
    
    await axios
      .post(url, { email: this.state.email, password: this.state.password })
      .then((res) => {
        //Saving tolken to local storage
        console.log(res);
        localStorage.setItem(`token`,res.data.user.tokens[res.data.user.tokens.length - 1].token);
        localStorage.setItem(`userType`,this.state.userType);
        this.setState({
          userData: {...res.data[this.state.userType], userType: this.state.userType},
          isLoggedIn: true,
        });
        this.props.updateLoginState(
          this.state.userData,
          this.state.isLoggedIn
        );
      });
      console.log('after login: ', this.state.userData)
  }
=======
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      let url = ''
>>>>>>> main

      userType === 'owner'
        ? (url = 'https://accommodation-finder.herokuapp.com/owner/login')
        : (url = 'https://accommodation-finder.herokuapp.com/renter/login')

      await axios
        .post(url, { email: email, password: password })
        .then((res) => {
          //Saving tolken to local storage
          localStorage.setItem(
            `token`,
            res.data.user.tokens[res.data.user.tokens.length - 1].token
          )
          localStorage.setItem(`userType`, userType)
          setUserData({
            ...res.data.user,
            userType: userType,
          })
          setIsLoggedIn(true)
          props.updateLoginState({ ...res.data.user, userType: userType }, true)
          console.log(userContext)
          userContext.setUserData({ ...res.data.user, userType: userType })
        })
    },
    [email, password, userType]
  )

  return (
    <>
      {!isLoggedIn && (
        <div className="login-height-1-1">
          <div className="login-background-cover login-height-1-1 login-flex login-light">
            <div className="login-overlay-secondary login-position-cover"></div>

            <div className="login-auth-2 login-position-z-index">
              <NavLink activeStyle={{ color: '#fff' }} to="/home">
                <img className="login-logo" src={logo_trang} />
              </NavLink>

              <h5 className="login-heading-line">
                <span>Đăng nhập</span>
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="login-margin">
                  <div className="login-inline">
                    <input
                      className="login-input login-border-pill"
                      placeholder="Email"
                      type="email"
                      value={email}
                      required
                      onChange={(event) => {
                        setEmail(event.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className="login-margin">
                  <div className="login-inline">
                    <input
                      className="login-input login-border-pill"
                      placeholder="Password"
                      type="password"
                      value={password}
                      minLength="8"
                      required
                      onChange={(event) => {
                        setPassword(event.target.value)
                      }}
                    />
                  </div>
                </div>

                <div className="login-margin login-text-left login-text-small">
                  Bạn là:
                  <input
                    className="login-radio margin"
                    type="radio"
                    name="typeUser"
                    id="owner"
                    required
                    onChange={() => setUserType('owner')}
                  />
                  <label>Chủ trọ</label>
                  <input
                    className="login-radio margin"
                    type="radio"
                    name="typeUser"
                    id="renter"
                    onChange={() => setUserType('renter')}
                  />
                  <label>Người thuê trọ</label>
                </div>

                <div className="login-margin login-text-left login-text-small">
                  <label>
                    <input className="login-checkbox" type="checkbox" /> Nhớ mật
                    khẩu
                  </label>
                </div>
                <button className="login-button login-border-pill">
                  Đăng nhập
                </button>

                <div className="login-margin login-text-small">
                  <p
                    style={{
                      fontStyle: 'italic',
                      color: 'red',
                      fontSize: '13px',
                    }}
                  >
                    {status}
                  </p>
                  Bạn chưa có tài khoản?{' '}
                  <NavLink
                    className="login-link-primary login-text-bold"
                    activeStyle={{ color: '#fff' }}
                    to="/signup"
                  >
                    Đăng ký
                  </NavLink>
                  <NavLink
                    className="login-margin login-display-block"
                    activeStyle={{ color: '#fff' }}
                    to="/resetpassword"
                  >
                    Quên mật khẩu?
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && <Redirect to="/home" />}
    </>
  )
}

export default Login
