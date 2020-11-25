import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
// import "../css/unikit.css";
import "../css/SignupOwner.css";
import logo from '../image/logo_ngang_trang.png';

class SignupOwner extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.changeState(false);
    }

    render() { 
        return ( 
            <div className="signupOwner-background-cover signupOwner-height-1-1 signupOwner-flex signupOwner-light">
                <div className="signupOwner-overlay-secondary signupOwner-position-cover"></div>
        
                <div className="signupOwner-auth-2 signupOwner-position-z-index">        
                    <NavLink  activeStyle={{color:'#fff'}} to="/home"><img className="signupOwner-logo" src={logo}/></NavLink>        
                    <h5 className="signupOwner-heading-line"><span>Đăng ký</span></h5>
        
                    <form>
                        <div className="signupOwner-margin">
                            <div className="signupOwner-width-1-1 signupOwner-inline">
                                <input className="signupOwner-input signupOwner-border-pill" placeholder="Name" type="text" required="required"/>
                            </div>
                        </div>
                        <div className="signupOwner-margin">
                            <div className="signupOwner-width-1-1 signupOwner-inline">
                                <input className="signupOwner-input signupOwner-border-pill" placeholder="Email" type="email" required="required"/>
                            </div>
                        </div>
                        <div className="signupOwner-margin">
                            <div className="signupOwner-width-1-1 signupOwner-inline">
                                <input className="signupOwner-input signupOwner-border-pill" placeholder="Identity card" type="text" minLength="9" maxLength="12" required="required"/>
                            </div>
                        </div>
                        <div className="signupOwner-margin">
                            <div className="signupOwner-width-1-1 signupOwner-inline">
                                <input className="signupOwner-input signupOwner-border-pill" placeholder="Phone number" type="text" minLength="10" maxLength="10" required="required"/>
                            </div>
                        </div>
                        <div className="signupOwner-margin">
                            <div className="signupOwner-width-1-1 signupOwner-inline">
                                <input className="signupOwner-input signupOwner-border-pill" placeholder="Address" type="text" required="required"/>
                            </div>
                        </div>
                        <div className="signupOwner-margin">
                            <div className="signupOwner-width-1-1 signupOwner-inline">
                                <input className="signupOwner-input signupOwner-border-pill" placeholder="Password" type="password" minLength="8" required="required"/>
                            </div>
                        </div>
        
                        <div className="signupOwner-margin">
                            <div className="signupOwner-width-1-1 padding-h signupOwner-inline signupOwner-text-left signupOwner-text-small">
                                <label><input className="signupOwner-checkbox" type="checkbox" required="required"/> Tôi đồng ý với <a className="signupOwner-link-primary" href="#">Các điều khoản và điều kiện</a></label>
                            </div>
                        </div>
        
        
                        <button className="signupOwner-button signupOwner-width-1-1 signupOwner-border-pill">Đăng ký</button>
        
                        <div className="signupOwner-margin signupOwner-width-1-1 signupOwner-text-small">
                            Bạn đã có tài khoản? <NavLink className="signupOwner-link-primary signupOwner-text-bold" activeStyle={{color:'#fff'}} to="/login" onClick = {this.props.changeState}>Đăng nhập</NavLink>
                        </div>
        
                    </form>
        
        
                </div>
        
            </div>
    
        );
    }
}
 
export default SignupOwner;