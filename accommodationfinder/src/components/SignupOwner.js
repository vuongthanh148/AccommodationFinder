import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom'
// import "../css/unikit.css";
import '../css/SignupOwner.css'
import logo from '../image/logo_ngang_trang.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class SignupOwner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      citizenId: '',
      phoneNumber: '',
      email: '',
      password: '',
      userType: 'owner',
      status: '',
      userData: {},
      isLoggedIn: false,
    }

    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount() {
    this.props.changeNavbarState(false)
  }

  handleRegister = async (event) => {
    event.preventDefault()
    const {
      name,
      address,
      citizenId,
      phoneNumber,
      email,
      password,
    } = this.state
    await axios
      .post('https://accommodation-finder.herokuapp.com/owner/signup', {
        name,
        address,
        citizenId,
        phoneNumber,
        email,
        password,
      })
      .then((res) => {
        if (res.data.response) {
          toast.info(res.data.response, {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        } else {
          toast.error(res.data.message, {
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
      })
      .catch((err) => console.log(err))
    //Send notification yêu cầu đăng ký thành công
  }

  render() {
    return (
      <>
        <div className="signupOwner-background-cover signupOwner-height-1-1 signupOwner-flex signupOwner-light">
          <div className="signupOwner-overlay-secondary signupOwner-position-cover"></div>

          <div className="signupOwner-auth-2 signupOwner-position-z-index">
            <NavLink activeStyle={{ color: '#fff' }} to="/home">
              <img className="signupOwner-logo" src={logo} />
            </NavLink>
            <h5 className="signupOwner-heading-line">
              <span>Đăng ký</span>
            </h5>

            <form onSubmit={this.handleRegister}>
              <div className="signupOwner-margin">
                <div className="signupOwner-width-1-1 signupOwner-inline">
                  <input
                    className="signupOwner-input signupOwner-border-pill"
                    placeholder="Name"
                    type="text"
                    required
                    onChange={(event) => {
                      this.setState({ name: event.target.value })
                    }}
                  />
                </div>
              </div>
              <div className="signupOwner-margin">
                <div className="signupOwner-width-1-1 signupOwner-inline">
                  <input
                    className="signupOwner-input signupOwner-border-pill"
                    placeholder="Address"
                    type="text"
                    required
                    onChange={(event) => {
                      this.setState({ address: event.target.value })
                    }}
                  />
                </div>
              </div>
              <div className="signupOwner-margin">
                <div className="signupOwner-width-1-1 signupOwner-inline">
                  <input
                    className="signupOwner-input signupOwner-border-pill"
                    placeholder="Phone Number"
                    type="number"
                    minLength="10"
                    maxLength="10"
                    required
                    onChange={(event) => {
                      this.setState({ phoneNumber: event.target.value })
                    }}
                  />
                </div>
              </div>
              <div className="signupOwner-margin">
                <div className="signupOwner-width-1-1 signupOwner-inline">
                  <input
                    className="signupOwner-input signupOwner-border-pill"
                    placeholder="Citizen Id"
                    type="number"
                    minLength="9"
                    maxLength="12"
                    required
                    onChange={(event) => {
                      this.setState({ citizenId: event.target.value })
                    }}
                  />
                </div>
              </div>

              <div className="signupOwner-margin">
                <div className="signupOwner-width-1-1 signupOwner-inline">
                  <input
                    className="signupOwner-input signupOwner-border-pill"
                    placeholder="Email"
                    type="email"
                    required
                    onChange={(event) => {
                      this.setState({ email: event.target.value })
                    }}
                  />
                </div>
              </div>
              <div className="signupOwner-margin">
                <div className="signupOwner-width-1-1 signupOwner-inline">
                  <input
                    className="signupOwner-input signupOwner-border-pill"
                    placeholder="Password"
                    type="password"
                    minLength="8"
                    required
                    onChange={(event) => {
                      this.setState({ password: event.target.value })
                    }}
                  />
                </div>
              </div>
              <div className="signupOwner-margin">
                <div className="signupOwner-width-1-1 padding-h signupOwner-inline signupOwner-text-left signupOwner-text-small">
                  <label>
                    <input
                      className="signupOwner-checkbox"
                      type="checkbox"
                      required
                    />
                    Tôi đồng ý với
                    <a
                      style={{ paddingLeft: '5px' }}
                      className="signupOwner-link-primary"
                      href="#"
                    >
                      Các điều khoản và điều kiện
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="signupOwner-button signupOwner-width-1-1 signupOwner-border-pill"
              >
                Đăng ký
              </button>

              <div className="signupOwner-margin signupOwner-width-1-1 signupOwner-text-small">
                Bạn đã có tài khoản?
                <NavLink
                  className="signupOwner-link-primary signupOwner-text-bold"
                  activeStyle={{ color: '#fff' }}
                  to="/login"
                  onClick={this.props.changeNavbarState}
                >
                  Đăng nhập
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default SignupOwner
