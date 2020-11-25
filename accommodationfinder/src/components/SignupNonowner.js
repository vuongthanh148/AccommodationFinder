import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
// import "../css/unikit.css";
import "../css/SignupNonowner.css";
import logo from '../image/logo_ngang_trang.png';

class SignupNonowner extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.changeState(false);
    }

    render() { 
        return ( 
            <div className="signupNonowner-background-cover signupNonowner-height-1-1 signupNonowner-flex signupNonowner-light">
                <div className="signupNonowner-overlay-secondary signupNonowner-position-cover"></div>
        
                <div className="signupNonowner-auth-2 signupNonowner-position-z-index">        
                    <NavLink  activeStyle={{color:'#fff'}} to="/home"><img className="signupNonowner-logo" src={logo}/></NavLink>        
                    <h5 className="signupNonowner-heading-line"><span>Đăng ký</span></h5>
        
                    <form>
                        <div className="signupNonowner-margin">
                            <div className="signupNonowner-width-1-1 signupNonowner-inline">
                                <input className="signupNonowner-input signupNonowner-border-pill" placeholder="Name" type="text" required="required"/>
                            </div>
                        </div>
                        <div className="signupNonowner-margin">
                            <div className="signupNonowner-width-1-1 signupNonowner-inline">
                                <input className="signupNonowner-input signupNonowner-border-pill" placeholder="Email" type="email" required="required"/>
                            </div>
                        </div>
                        <div className="signupNonowner-margin">
                            <div className="signupNonowner-width-1-1 signupNonowner-inline">
                                <input className="signupNonowner-input signupNonowner-border-pill" placeholder="Password" type="password" minLength="8" required="required"/>
                            </div>
                        </div>
        
                        <div className="signupNonowner-margin">
                            <div className="signupNonowner-width-1-1 padding-h signupNonowner-inline signupNonowner-text-left signupNonowner-text-small">
                                <label><input className="signupNonowner-checkbox" type="checkbox" required="required"/> Tôi đồng ý với <a className="signupNonowner-link-primary" href="#">Các điều khoản và điều kiện</a></label>
                            </div>
                        </div>
        
        
                        <button className="signupNonowner-button signupNonowner-width-1-1 signupNonowner-border-pill">Đăng ký</button>
        
                        <div className="signupNonowner-margin signupNonowner-width-1-1 signupNonowner-text-small">
                            Bạn đã có tài khoản? <NavLink className="signupNonowner-link-primary signupNonowner-text-bold" activeStyle={{color:'#fff'}} to="/login" onClick = {this.props.changeState}>Đăng nhập</NavLink>
                        </div>
        
                    </form>
        
        
                </div>
        
            </div>
    
        );
    }
}
 
export default SignupNonowner;