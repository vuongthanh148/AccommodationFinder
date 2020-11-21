// Bắt buộc có trên 8 ký tự
// Người dùng: Ten, email, pass
// Chủ trọ: Ten, cmnd (9-12 số), dia chỉ, sdt(10 số), email, pass

import react, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import reactDOM from 'react-dom';
import "../css/unikit.css";
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
            <div class="uk-background-cover uk-background-center-center uk-height-1-1 ev-section-padding-v-s uk-panel uk-flex uk-flex-wrap uk-flex-middle uk-flex-center uk-light">
                <div class="uk-overlay ev-overlay-secondary uk-position-cover"></div>
                <div class="ev-auth-2 uk-position-z-index signup-width">
                    <NavLink  activeStyle={{color:'#fff'}} to="/home"><img className="ev-logo" src={logo}/></NavLink>
                    <h5 class="uk-heading-line"><span>Sign Up</span></h5>
                    <div className="signup-option-container">
                        <div className="signup-option">
                            <div className="option-content">
                                <h2>Chủ trọ</h2>
                                <h4>Bạn có thể đăng bài viết, chat với admin, nhận được những dữ liệu thống kê về nhu cầu thuê trọ để có những chiến lược marketing hiệu quả</h4>
                            </div>
                            <div className="option-button">
                                <button className="uk-button uk-width-1-1 uk-border-pill signup-button">Đăng ký</button>
                            </div>
                        </div>
                        <div className="signup-option">
                            <div className="option-content">
                                <h2>Người thuê trọ</h2>
                                <h4>Bạn có thể tìm kiếm những trọ phù hợp nhất với nhu cầu của mình...</h4>
                            </div>
                            <div className="option-button">
                                <button className="uk-button uk-width-1-1 uk-border-pill signup-button">Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Signup;