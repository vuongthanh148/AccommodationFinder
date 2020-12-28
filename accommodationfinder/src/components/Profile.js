import React, { Component } from 'react'
import { Icon, InlineIcon } from '@iconify/react'
import angleDoubleRight from '@iconify-icons/fa-solid/angle-double-right'
import lockIcon from '@iconify-icons/fa-solid/lock'
import avatar from '../image/avatar.png'
import '../css/Profile.css'
import { Favorite, TocRounded } from '@material-ui/icons'
import { UserContext } from '../context/user.context'
import List from './List'
import Listing from './Listing'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import FormData from 'form-data'

class Profile extends Component {
  render() {
    return (
      <div>
        {/* <Nav /> */}
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

  state = {
    myProfile: 1,
    favorites: 2,
    changePassword: 3,
    currentPage: 1,
    userData: this.context.userData,
    userToken: localStorage.getItem('token'),
    list_follow_accomod: [],
    fisnishFetching: false,
    userAvatar: this.context.userData.avatar,
    uploadedFile: null,
  }

  async componentDidMount() {
    await axios({
      method: 'POST',
      url: `https://accommodation-finder.herokuapp.com/followList`,
      data: {
        _id: this.state.userData._id,
      },
      headers: {
        Authorization: `Bearer ${this.state.userToken}`,
      },
    }).then(async (res) => {
      let tempList = []
      await res.data.forEach((e) => {
        axios
          .get(`https://accommodation-finder.herokuapp.com/accommodation/${e}`)
          .then((res2) => {
            tempList.push(res2.data)
          })
      })
      this.setState(
        {
          list_follow_accomod: tempList,
        },
        () => {
          console.log(this.state.list_follow_accomod)
          this.setState({
            fisnishFetching: true,
          })
        }
      )
    })
  }

  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] })
    console.log(event.target.files[0])

    // let formData = new FormData()
    // let file = URL.createObjectURL(event.target.files[0])
    // formData.append('image', file)

    var data = new FormData()
    data.append(
      'image',
      event.target.files[0]
    )

    var config = {
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      headers: { 
        'Authorization': 'Client-ID 546c25a59c58ad7', 
        'Accept': "*/*",
      },
      data : data
    };
  
    axios(config)
      .then((res) => {
        console.log('res: ', res.data.data.link)
        this.setState({
          userAvatar: res.data.data.link
        })
      })
      .catch((e) => {
        // res.send();
      })
  }

  render() {
    const {
      myProfile,
      favorites,
      changePassword,
      currentPage,
      userAvatar,
    } = this.state
    if (this.state.fisnishFetching) {
      return (
        <div className="ev-page-container">
          <div className="profile-grid">
            <div className="profile-width-1-4">
              <div className="profile-box-shadow-small profile-border-rounded profile-padding">
                <div
                  className="profile-block profile-margin-remove profile-text-center"
                  style={{ position: 'relative' }}
                >
                  <img
                    className="profile-border-rounded profile-box-shadow-small profile-width-1-2"
                    src={userAvatar}
                  />
                  <label htmlFor="files" className="change_label">
                    Change Avatar
                  </label>
                  <input
                    type="file"
                    className="change_input"
                    id="files"
                    onChange={this.onFileChange}
                  ></input>
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
                      onClick={() => this.setState({ currentPage: 1 })}
                    >
                      Hồ sơ cá nhân
                    </a>
                  </li>
                  <li>
                    <a
                      className="ev-link-secondary"
                      onClick={() => this.setState({ currentPage: 2 })}
                    >
                      Danh sách yêu thích
                    </a>
                  </li>
                  <li>
                    <a
                      className="ev-link-secondary"
                      onClick={() => this.setState({ currentPage: 3 })}
                    >
                      Đổi mật khẩu
                    </a>
                  </li>
                </ul>

                <hr />

                <a className="profile-button profile-button-default profile-text-truncate profile-border-rounded profile-width-1-1">
                  <Icon
                    icon={lockIcon}
                    className="profile-margin-small-right"
                  />
                  Đăng xuất
                </a>
              </div>
            </div>
            {myProfile === currentPage && (
              <div className="user-profile">
                <MyProfile />
              </div>
            )}
            {favorites === currentPage && (
              <div className="user-profile">
                <Favorites list_accomod={this.state.list_follow_accomod} />
              </div>
            )}
            {changePassword === currentPage && (
              <div className="user-changepassword">
                <ChangePassword />
              </div>
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div style={{ position: 'relative', width: '100vw', height: '90vh' }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              position: 'absolute',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
              margin: 'auto',
            }}
          >
            <Loader type={'Bars'} color="#bf7c2f" height={200} width={200} />
            <p style={{ paddingTop: '20px', fontSize: '20px' }}>Loading...</p>
          </div>
        </div>
      )
    }
  }
}

class MyProfile extends Component {
  static contextType = UserContext

  render() {
    const { phoneNumber, email, citizenId, address } = this.context.userData
    return (
      <div>
        <h5 className="profile-heading-line">
          <span>Hồ sơ cá nhân</span>
        </h5>

        <form className="profile-grid">
          <div className="profile-grid-margin profile-first-column">
            <label className="profile-form-label">Số điện thoại</label>
            <div>
              <input
                className="profile-input profile-border-rounded"
                minLength="10"
                type="text"
                disabled={!phoneNumber ? true : false}
                defaultValue={phoneNumber ? phoneNumber : ''}
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
              />
            </div>
          </div>
        </form>
        <div className="profile-grid-margin profile-first-column">
          <button
            className="profile-button profile-button-primary profile-border-rounded"
            type="submit"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    )
  }
}
class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list_accomod: this.props.list_accomod,
    }
  }
  render() {
    console.log(this.props.list_accomod)
    return (
      <div>
        <h5 className="profile-heading-line">
          <span>Danh sách yêu thích</span>
        </h5>
        <div className="list_favorite">
          {this.state.list_accomod.map((accomod, index) => {
            return <List accomod={accomod} key={index} isFollowed={true} />
          })}
        </div>
      </div>
    )
  }
}

class ChangePassword extends Component {
  state = {}
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
              />
            </div>
          </div>
        </form>
        <div className="changebutton">
          <button
            className="profile-button profile-button-primary profile-border-rounded"
            type="submit"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    )
  }
}
