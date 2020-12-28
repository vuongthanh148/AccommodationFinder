import React, { Component } from 'react'
import { Icon, InlineIcon } from '@iconify/react'
import angleDoubleRight from '@iconify-icons/fa-solid/angle-double-right'
import lockIcon from '@iconify-icons/fa-solid/lock'
import avatar from '../image/avatar.png'
import '../css/Profile.css'
import { Favorite } from '@material-ui/icons'
import { UserContext } from '../context/user.context'
import axios from 'axios'

class Profile extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Info />
      </div>
    )
  }
}

export default Profile

class Nav extends Component {
  state = {}
  render() {
    return (
      <div className="ev-page-title-2">
        <div className="ev-container">
          <div className="profile-flex profile-flex-center profile-flex-left@s">
            <h5 className="title">My Profile</h5>
          </div>
          <div className="margin-left">
            <ul className="profile-breadcrumb profile-flex-center profile-flex-right@s">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="profile-disabled">
                <Icon icon={angleDoubleRight} className="margin-right" />
                <a>My Profile</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

class Info extends Component {
  static contextType = UserContext
  constructor(props) {
    super(props)
    this.state = {
      myProfile: '',
      favorites: 'none',
      changePassword: 'none',
    }
  }
  changeMyProfile = () => {
    this.setState({
      myProfile: '',
      favorites: 'none',
      changePassword: 'none',
    })
  }
  changeFavorites = () => {
    this.setState({
      myProfile: 'none',
      favorites: '',
      changePassword: 'none',
    })
  }
  changeMyPassword = () => {
    this.setState({
      myProfile: 'none',
      favorites: 'none',
      changePassword: '',
    })
  }

  render() {
    return (
      <div className="ev-page-container">
        <div className="profile-grid-large profile-grid">
          <div className="profile-width-1-4">
            <div className="profile-box-shadow-small profile-border-rounded profile-padding">
              <div className="profile-block profile-margin-remove profile-text-center">
                <img
                  className="profile-border-rounded profile-box-shadow-small profile-width-1-2"
                  src={avatar}
                />
              </div>

              <div className="profile-margin profile-text-center">
                <p
                  className="profile-text-bold profile-margin-remove"
                  style={{ fontSize: '1rem' }}
                >
                  {this.context.userData.name}
                </p>
                <p className="profile-text-muted profile-text-small profile-margin-remove">
                  {this.context.userData.userType.replace(
                    /\w\S*/g,
                    function (txt) {
                      return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                      )
                    }
                  )}
                </p>
              </div>

              <hr />

              <ul className="profile-list ev-list profile-text-small">
                <li>
                  <a
                    className="ev-link-secondary"
                    onClick={this.changeMyProfile}
                  >
                    Hồ sơ cá nhân
                  </a>
                </li>
                <li>
                  <a
                    className="ev-link-secondary"
                    onClick={this.changeFavorites}
                  >
                    Danh sách yêu thích
                  </a>
                </li>
                <li>
                  <a
                    className="ev-link-secondary"
                    onClick={this.changeMyPassword}
                  >
                    Đổi mật khẩu
                  </a>
                </li>
              </ul>

              <hr />

              <a className="profile-button profile-button-default profile-text-truncate profile-border-rounded profile-width-1-1">
                <Icon icon={lockIcon} className="profile-margin-small-right" />{' '}
                Đăng xuất
              </a>
            </div>
          </div>
          <div
            className="user-profile"
            style={{ display: this.state.myProfile }}
          >
            <MyProfile />
          </div>
          <div
            className="user-profile"
            style={{ display: this.state.favorites }}
          >
            <Favorites />
          </div>
          <div
            className="user-changepassword"
            style={{ display: this.state.changePassword }}
          >
            <ChangePassword />
          </div>
        </div>
      </div>
    )
  }
}

class MyProfile extends Component {
  static contextType = UserContext
  state = {
    phoneNumber: this.context.userData.phoneNumber,
    email: this.context.userData.email,
    citizenId: this.context.userData.citizenId,
    address: this.context.userData.address,
    userToken: localStorage.getItem('token'),
  }

  handlePhoneChange = (event) => {
    this.setState({ phoneNumber: event.target.value })
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handleCitizenIdChange = (event) => {
    this.setState({ citizenId: event.target.value })
  }

  handleAddressChange = (event) => {
    this.setState({ address: event.target.value })
  }

  handleSubmit = () => {
    axios({
      method: 'POST',
      url: `https://accommodation-finder.herokuapp.com/owner/profile`,
      data: {
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,

        address: this.state.address,
      },
      headers: {
        Authorization: `Bearer ${this.state.userToken}`,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e.response.data)
      })
  }

  render() {
    const { phoneNumber, email, citizenId, address } = this.context.userData
    console.log(phoneNumber)
    return (
      <div>
        <h5 className="profile-heading-line">
          <span>Hồ sơ cá nhân</span>
        </h5>

        <form className="profile-grid">
          {/* <div className="profile-first-column">
            <label className="profile-form-label">Họ</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                type="text"
                defaultValue="Le"
              />
            </div>
          </div>

          <div className="profile-second-column">
            <label className="profile-form-label">Tên</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                type="text"
                defaultValue={}
              />
            </div>
          </div> */}

          <div className="profile-grid-margin profile-first-column">
            <label className="profile-form-label">Số điện thoại</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                minLength="10"
                type="text"
                disabled={!phoneNumber ? true : false}
                defaultValue={phoneNumber ? phoneNumber : ''}
                onChange={this.handlePhoneChange}
              />
            </div>
          </div>

          <div className="profile-grid-margin profile-second-column">
            <label className="profile-form-label">Email</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                type="email"
                defaultValue={email ?? email}
                disabled={!email ? true : false}
                onChange={this.handleEmailChange}
              />
            </div>
          </div>
          <div className="profile-grid-margin profile-first-column">
            <label className="profile-form-label">Chứng minh nhân dân</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                minLength="9"
                type="text"
                defaultValue={citizenId ?? citizenId}
                disabled={!citizenId ? true : false}
                onChange={this.handleCitizenIdChange}
              />
            </div>
          </div>
          <div className="profile-grid-margin profile-second-column">
            <label className="profile-form-label">Địa chỉ</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                type="text"
                disabled={!address ? true : false}
                defaultValue={address ?? address}
                onChange={this.handleAddressChange}
              />
            </div>
          </div>
        </form>
        <div className="profile-grid-margin profile-first-column">
          <button
            className="profile-button profile-button-primary profile-border-rounded"
            type="submit"
            onClick={this.handleSubmit}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    )
  }
}
class Favorites extends Component {
  state = {}
  render() {
    return (
      <div>
        <h5 className="profile-heading-line">
          <span>Danh sách yêu thích</span>
        </h5>
        <p>
          This is a list of favorites
          accommodation...............................................................................................
        </p>
      </div>
    )
  }
}

class ChangePassword extends Component {
  static contextType = UserContext
  state = {
    password: '',
    newPassWord: '',
    newPassWord1: '',
    userToken: localStorage.getItem('token'),
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  handleNewPasswordChange = (event) => {
    this.setState({ newPassWord: event.target.value })
  }

  handleNewPassword1Change = (event) => {
    this.setState({ newPassWord1: event.target.value })
  }

  handleSubmit = () => {
    const email = this.context.userData.email
    axios
      .post('https://accommodation-finder.herokuapp.com/owner/login', {
        email: email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          if (this.state.newPassWord === this.state.newPassWord1) {
            axios({
              method: 'POST',
              url: `https://accommodation-finder.herokuapp.com/owner/profile`,
              data: {
                password: this.state.newPassWord,
              },
              headers: {
                Authorization: `Bearer ${this.state.userToken}`,
              },
            })
              .then((res) => {
                console.log(res)
              })
              .catch((e) => {
                console.log(e.response.data)
              })
          }
        }
      })
  }

  render() {
    return (
      <div>
        <h5 className="profile-heading-line">
          <span>Đổi mật khẩu</span>
        </h5>
        <form className="changePassword">
          <div className="change-width">
            <label className="password-form-label">Mật khẩu hiện tại</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                type="password"
                minLength="8"
                required="required"
                onChange={this.handlePasswordChange}
              />
            </div>
          </div>
          <div className="change-padding change-width">
            <label className="password-form-label">Mật khẩu mới</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                type="password"
                minLength="8"
                required="required"
                onChange={this.handleNewPasswordChange}
              />
            </div>
          </div>
          <div className="change-padding change-width">
            <label className="password-form-label">Nhập lại mật khẩu</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                type="password"
                minLength="8"
                required="required"
                onChange={this.handleNewPassword1Change}
              />
            </div>
          </div>
        </form>
        <div className="changebutton">
          <button
            className="profile-button profile-button-primary profile-border-rounded"
            type="submit"
            onClick={this.handleSubmit}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    )
  }
}
