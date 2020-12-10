import react, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import reactDOM from 'react-dom';
import "../css/login.css";
import logo_trang from '../image/logo_ngang_trang.png';


class Login extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.changeState(false);
    }

    render(){
        return(
            <div className="login-height-1-1">
                <div className="login-background-cover login-height-1-1 login-flex login-light">
                    <div className="login-overlay-secondary login-position-cover"></div>

                    <div className="login-auth-2 login-position-z-index">
                        <NavLink  activeStyle={{color:'#fff'}} to="/home"><img className="login-logo" src={logo_trang}/></NavLink>
                    
                        <h5 className="login-heading-line"><span>Đăng nhập</span></h5>

                        <form>
                            <div className="login-margin">
                                <div className="login-inline">
                                    <input className="login-input login-border-pill" placeholder="Email" type="text" required="required"/>
                                </div>
                            </div>
                            <div className="login-margin">
                                <div className="login-inline">
                                    <input className="login-input login-border-pill" placeholder="Password" type="text" required="required"/>
                                </div>
                            </div>

                            <div className="login-margin login-text-left login-text-small">
                                <label>
                                    Bạn là: 
                                    <input className="login-radio margin" type="radio" name="typeUser" />Chủ trọ
                                    <input className="login-radio margin" type="radio" name="typeUser" />Người thuê trọ
                                </label>
                            </div>

                            <div className="login-margin login-text-left login-text-small">
                                <label><input className="login-checkbox" type="checkbox"/> Nhớ mật khẩu</label>
                            </div>
                            <NavLink  activeStyle={{color:'#fff'}} to="/home1">
                                <button className="login-button login-border-pill">Đăng nhập</button>
                            </NavLink>
                            {/* <button className="login-button login-border-pill">Đăng nhập</button> */}

                            <div className="login-margin login-text-small">
                            Bạn chưa có tài khoản? <NavLink className="login-link-primary login-text-bold" activeStyle={{color:'#fff'}} to="/signup" onClick = {this.props.changeState}>Đăng ký</NavLink>
                            <a className="login-margin login-display-block" href="forgot-2.html*">Quên mật khẩu?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;