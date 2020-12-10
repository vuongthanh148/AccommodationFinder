// Bắt buộc có trên 8 ký tự
// Người dùng: Ten, email, pass
// Chủ trọ: Ten, cmnd (9-12 số), dia chỉ, sdt(10 số), email, pass

import react, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import "../css/Signup.css";
import logo from '../image/logo_ngang_trang.png';

class Signup extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.changeState(false);
    }

    render() { 
        return ( 
            <div className="signup-background-cover signup-flex signup-light">
                <div className="signup-overlay-secondary signup-position-cover"></div>
                <div className="signup-position-z-index signup-width">
                    <NavLink  activeStyle={{color:'#fff'}} to="/home"><img className="signup-logo" src={logo}/></NavLink>
                    <h5 className="signup-heading-line"><span>Sign Up</span></h5>
                    <div className="signup-option-container">
                        <div className="signup-option signup-option-owner">
                            <div className="option-content">
                                <h2>Chủ trọ</h2>
                                <h4>Bạn có thể đăng bài viết, chat với admin, nhận được những dữ liệu thống kê về nhu cầu thuê trọ để có những chiến lược marketing hiệu quả</h4>
                            </div>
                            <div className="option-button">
                                <NavLink className="signup-button signup-border-pill signup-text-bold signup-position-z-index" activeStyle={{color:'#fff'}} to="/signupOwner" onClick = {this.props.changeState}>Đăng ký</NavLink>
                            </div>
                        </div>
                        <div className="signup-option">
                            <div className="option-content">
                                <h2>Người thuê trọ</h2>
                                <h4>Bạn có thể tìm kiếm những trọ phù hợp nhất với nhu cầu của mình...</h4>
                            </div>
                            <div className="option-button">
                                <NavLink className="signup-button signup-border-pill signup-text-bold" activeStyle={{color:'#fff'}} to="/signupRenter" onClick = {this.props.changeState}>Đăng ký</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Signup;