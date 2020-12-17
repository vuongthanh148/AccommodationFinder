import React, { Component } from "react";
import "../css/Footer.css";
import { Icon, InlineIcon } from '@iconify/react';
import envelope from '@iconify-icons/fa-solid/envelope';
import phoneAlt from '@iconify-icons/fa-solid/phone-alt';
import mapMarkerAlt from '@iconify-icons/fa-solid/map-marker-alt';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebookF,faTwitter,faYoutube,faLinkedin} from "@fortawesome/free-brands-svg-icons";

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="ev-footer">
                <div className="ev-container">
                    <div className="ev-widgets uk-grid-large uk-grid">
                        <div className="uk-width-1-1 uk-width-1-2@s uk-width-1-4@m">
                            <h4 className="ev-title">About Us</h4>
                            <div className="ev-about">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            <ul className="ev-follow uk-iconnav">
                                <li>
                                    <a href=""><FontAwesomeIcon icon={faFacebookF} style={{ color: "#ababab"}}/></a>
                                </li>
                                <li>
                                    <a href=""><FontAwesomeIcon icon={faTwitter} style={{ color: "#ababab"}}/></a>
                                </li>
                                <li>
                                    <a href=""><FontAwesomeIcon icon={faYoutube} style={{ color: "#ababab"}}/></a>
                                </li>
                                <li>
                                    <a href=""><FontAwesomeIcon icon={faLinkedin} style={{ color: "#ababab"}}/></a>
                                </li>
                            </ul>
                        </div>
                        <div className="uk-width-1-1 uk-width-1-2@s uk-width-1-4@m margin-top">
                            <h4 className="ev-title">Quick Links</h4>
                            <ul className="uk-list">
                                <li><a href="">About Us</a></li>
                                <li><a href="">Terms & Conditions</a></li>
                                <li><a href="">User Guide</a></li>
                                <li><a href="">Support Center</a></li>
                                <li><a href="">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="uk-width-1-1 uk-width-1-2@s uk-width-1-4@m uk-grid-margin">
                            <h4 className="ev-title">Contact Us</h4>
                            <ul className="uk-list">
                                <li><Icon icon={envelope} className="ev-icon"/> abc@gmail.com</li>
                                <li><Icon icon={mapMarkerAlt} className="ev-icon"/> Xuan Thuy, Cau Giay, Ha Noi (Viet Nam)</li>
                                <li><Icon icon={phoneAlt} className="ev-icon"/> +84 123456789</li>
                            </ul>
                        </div>
                        <div className="uk-width-1-1 uk-width-1-2@s uk-width-1-4@m uk-grid-margin">
                            <h4 className="ev-title">Subscribe Now</h4>
                            <form className="uk-light">
                                <input type="email" className="uk-input uk-width-1-1 uk-form-large uk-border-pill uk-margin-small-bottom" placeholder="Your Email" />
                                <button className="uk-button uk-width-1-1 uk-button-large uk-button-primary uk-border-pill">Submit Now</button>
                            </form>
                        </div>
                    </div>
                </div> 
                <div className="ev-copyright">
                    <div className="uk-container">
                        <div className='uk-grid'>
                            <div className="uk-width-1-1 uk-width-1-2@m uk-text-center uk-text-left@m">
                                © 2020 EasyAccomod.
                            </div>
                            <div className="uk-width-1-1 uk-width-1-2@m uk-flex-center uk-flex-right@m uk-visible@s">
                                <ul className="uk-subnav uk-flex-center uk-flex-right@m">
                                    <li><a href="">Home</a></li>
                                    <li><a href="">Listing</a></li>
                                    <li><a href="">Log Out</a></li>
                                    <li><a href="">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}
 
export default Footer;