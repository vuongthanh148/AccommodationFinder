import react, { Component } from "react";
import reactDOM from "react-dom";
// import '../css/unikit.css';
import { Icon, InlineIcon } from '@iconify/react';
import angleDoubleRight from '@iconify-icons/fa-solid/angle-double-right';
import lockIcon from '@iconify-icons/fa-solid/lock';
import avatar from "../image/avatar.png";
import '../css/Profile.css';
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
    state = {  }
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
                                <p className="profile-text-bold profile-margin-remove">Le Thi Hanh</p>
                                <p className="profile-text-muted profile-text-small profile-margin-remove">User</p>
                            </div>

                            <hr />

                            <ul className="profile-list ev-list profile-text-small">
                                <li><a className="ev-link-secondary" href="profile.html">My Profile</a></li>
                                <li><a className="ev-link-secondary" href="favorites.html">Favorites</a></li>
                                <li><a className="ev-link-secondary" href="profile.html">Change Password</a></li>
                            </ul>

                            <hr />

                            <a className="profile-button profile-button-default profile-text-truncate profile-border-rounded profile-width-1-1">
                                <Icon icon={lockIcon} className="profile-margin-small-right"/> Log Out
                            </a>
                        </div>
                    </div>
                    <div className="user-profile">
                        <MyProfile />
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
                <h5 className="profile-heading-line"><span>My Profile</span></h5>

                <form className="profile-grid">
                    <div className="profile-first-column">
                        <label className="profile-form-label">First Name</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="text" defaultValue="Le" />
                        </div>
                    </div>

                    <div className="profile-second-column">
                        <label className="profile-form-label" htmlFor="form-stacked-text">Last Name</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="text" defaultValue="Hanh" />
                        </div>
                    </div>

                    <div className="profile-grid-margin profile-first-column">
                        <label className="profile-form-label" htmlFor="form-stacked-text">Phone</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="text" defaultValue="+123 456 789" />
                        </div>
                    </div>

                    <div className="profile-grid-margin profile-second-column">
                        <label className="profile-form-label" htmlFor="form-stacked-text">Email</label>
                        <div>
                            <input className="profile-input profile-border-rounded" type="text" defaultValue="abc@gmail.com" />
                        </div>
                    </div>
                    <div className="profile-grid-margin profile-first-column">
                        <button className="profile-button profile-button-primary profile-border-rounded" type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
        );
    }
}