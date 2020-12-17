import react, { Component } from "react";
import reactDOM from "react-dom";
// import '../css/unikit.css';
import { Icon, InlineIcon } from '@iconify/react';
import angleDoubleRight from '@iconify-icons/fa-solid/angle-double-right';
import lockIcon from '@iconify-icons/fa-solid/lock';
import avatar from "../image/avatar.png";
import '../css/Profile.css';
import { Favorite } from "@material-ui/icons";
require('typeface-montserrat');

class Profile extends Component {
  render() {
    return (
        <div>           
          <Nav />
          <Info />            
        </div>
    );
  }
}

export default Profile;

class Nav extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="ev-page-title-2">
                <div className="ev-container">     
                    <div className="profile-flex profile-flex-center profile-flex-left@s"><h5 className="title">My Profile</h5></div>
                    <div className="margin-left">
                        <ul className="profile-breadcrumb profile-flex-center profile-flex-right@s">
                            <li><a href="#">Home</a></li>
                            <li className="profile-disabled"><Icon icon={angleDoubleRight} className="margin-right"/><a>My Profile</a></li>
                        </ul>
                    </div>           
                </div>
            </div>
        );
    }
}

class Info extends Component {
    constructor(props){
        super(props)
        this.state = ({
          myProfile: "",
          favorites: "none",
          changePassword: "none"
        })
    }
    changeMyProfile = () => {
        this.setState({
            myProfile: "",
            favorites: "none",
            changePassword: "none"
        })
    }
    changeFavorites = () => {
        this.setState({
            myProfile: "none",
            favorites: "",
            changePassword: "none"
        })
    }
    changeMyPassword = () => {
        this.setState({
            myProfile: "none",
            favorites: "none",
            changePassword: ""
        })
    }

    render() { 
        return ( 
            <div className="ev-page-container">
                <div className="profile-grid-large profile-grid">
                    <div className="profile-width-1-4">
                        <div className="profile-box-shadow-small profile-border-rounded profile-padding">
                            <div className="profile-block profile-margin-remove profile-text-center">
                                <img className="profile-border-rounded profile-box-shadow-small profile-width-1-2" src={avatar} />
                            </div>

                            <div className="profile-margin profile-text-center">
                                <p className="profile-text-bold profile-margin-remove">Lê Thị Hạnh</p>
                                <p className="profile-text-muted profile-text-small profile-margin-remove">User</p>
                            </div>

                            <hr />

                            <ul className="profile-list ev-list profile-text-small">
                                <li><a className="ev-link-secondary" onClick = {this.changeMyProfile}>Hồ sơ cá nhân</a></li>
                                <li><a className="ev-link-secondary" onClick = {this.changeFavorites}>Danh sách yêu thích</a></li>
                                <li><a className="ev-link-secondary" onClick = {this.changeMyPassword}>Đổi mật khẩu</a></li>
                            </ul>

                            <hr />

                            <a className="profile-button profile-button-default profile-text-truncate profile-border-rounded profile-width-1-1">
                                <Icon icon={lockIcon} className="profile-margin-small-right"/> Đăng xuất
                            </a>
                        </div>
                    </div>
                    <div className="user-profile" style={{display: this.state.myProfile}}>
                        <MyProfile />
                    </div>
                    <div className="user-profile" style={{display: this.state.favorites}}>
                        <Favorites />
                    </div>
                    <div className="user-changepassword" style={{display: this.state.changePassword}}>
                        <ChangePassword />
                    </div>                   
                </div>
            </div>
        );
    }
}

class MyProfile extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <h5 className="profile-heading-line"><span>Hồ sơ cá nhân</span></h5>

                <form className="profile-grid">
                    <div className="profile-first-column">
                        <label className="profile-form-label">Họ</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="text" defaultValue="Le" />
                        </div>
                    </div>

                    <div className="profile-second-column">
                        <label className="profile-form-label">Tên</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="text" defaultValue="Hanh" />
                        </div>
                    </div>

                    <div className="profile-grid-margin profile-first-column">
                        <label className="profile-form-label">Số điện thoại</label>
                        <div>
                            <input className="profile-input profile-border-rounded" minLength="10" type="text" defaultValue="+123 456 7890" />
                        </div>
                    </div>

                    <div className="profile-grid-margin profile-second-column">
                        <label className="profile-form-label">Email</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="email" defaultValue="abc@gmail.com" />
                        </div>
                    </div>
                    <div className="profile-grid-margin profile-first-column">
                        <label className="profile-form-label">Chứng minh nhân dân</label>
                        <div>
                            <input className="profile-input profile-border-rounded" minLength="9" type="text" defaultValue="123 456 789" />
                        </div>
                    </div>
                    <div className="profile-grid-margin profile-second-column">
                        <label className="profile-form-label">Địa chỉ</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="text" defaultValue="Hà Nội, Việt Nam" />
                        </div>
                    </div>                  
                </form>
                <div className="profile-grid-margin profile-first-column">
                    <button className="profile-button profile-button-primary profile-border-rounded" type="submit">Lưu thay đổi</button>
                </div>
            </div>
        );
    }
}
class Favorites extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <h5 className="profile-heading-line"><span>Danh sách yêu thích</span></h5>
                <p>This is a list of favorites accommodation...............................................................................................</p>
            </div>
        );
    }
}

class ChangePassword extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <h5 className="profile-heading-line"><span>Đổi mật khẩu</span></h5>
                <form className="changePassword">
                    <div className="change-width">
                        <label className="password-form-label">Mật khẩu hiện tại</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="password" minLength="8" required="required"/>
                        </div>
                    </div>
                    <div className="change-padding change-width">
                        <label className="password-form-label">Mật khẩu mới</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="password" minLength="8" required="required"/>
                        </div>
                    </div>
                    <div className="change-padding change-width">
                        <label className="password-form-label">Nhập lại mật khẩu</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="password" minLength="8" required="required"/>
                        </div>
                    </div>
                </form>
                <div className="changebutton">
                    <button className="profile-button profile-button-primary profile-border-rounded" type="submit">Đổi mật khẩu</button>
                </div>
            </div>
        );
    }
}
