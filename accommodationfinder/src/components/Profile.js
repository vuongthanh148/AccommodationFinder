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
                    <div className="uk-flex uk-flex-center uk-flex-left@s"><h5 className="title">My Profile</h5></div>
                    <div className="margin-left">
                        <ul className="uk-breadcrumb uk-flex-center uk-flex-right@s">
                            <li><a href="#">Home</a></li>
                            <li className="uk-disabled"><Icon icon={angleDoubleRight} className="margin-right"/><a>My Profile</a></li>
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
                <div className="uk-grid-large uk-grid">
                    <div className="uk-width-1-4">
                        <div className="uk-box-shadow-small uk-border-rounded uk-padding">
                            <div className="uk-block uk-margin-remove uk-text-center">
                                <img className="uk-border-rounded uk-box-shadow-small uk-width-1-2" src={avatar} />
                            </div>

                            <div className="uk-margin uk-text-center">
                                <p className="uk-text-bold uk-margin-remove">Le Thi Hanh</p>
                                <p className="uk-text-muted uk-text-small uk-margin-remove">User</p>
                            </div>

                            <hr />

                            <ul className="uk-list ev-list uk-text-small">
                                <li><a className="ev-link-secondary" href="profile.html">My Profile</a></li>
                                <li><a className="ev-link-secondary" href="favorites.html">Favorites</a></li>
                                <li><a className="ev-link-secondary" href="profile.html">Change Password</a></li>
                            </ul>

                            <hr />

                            <a className="uk-button uk-button-default uk-text-truncate uk-border-rounded uk-width-1-1">
                                <Icon icon={lockIcon} className="uk-margin-small-right"/> Log Out
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
                <h5 className="uk-heading-line"><span>My Profile</span></h5>

                <form className="uk-grid">
                    <div className="uk-first-column">
                        <label className="uk-form-label">First Name</label>
                        <div>
                            <input className="uk-input uk-border-rounded" type="text" defaultValue="Le" />
                        </div>
                    </div>

                    <div className="uk-second-column">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Last Name</label>
                        <div>
                            <input className="uk-input uk-border-rounded" type="text" defaultValue="Hanh" />
                        </div>
                    </div>

                    <div className="uk-grid-margin uk-first-column">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Phone</label>
                        <div>
                            <input className="uk-input uk-border-rounded" type="text" defaultValue="+123 456 789" />
                        </div>
                    </div>

                    <div className="uk-grid-margin uk-second-column">
                        <label className="uk-form-label" htmlFor="form-stacked-text">Email</label>
                        <div>
                            <input className="uk-input uk-border-rounded" type="text" defaultValue="abc@gmail.com" />
                        </div>
                    </div>
                    <div className="uk-grid-margin uk-first-column">
                        <button className="uk-button uk-button-primary uk-border-rounded" type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
        );
    }
}