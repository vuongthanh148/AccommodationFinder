import react, { Component } from 'react';
import reactDOM from 'react-dom';
import "../css/login.css";
import "../css/unikit.css"
import logo_trang from '../image/logo_ngang_trang.png';

class Login extends Component {

    render(){
        return(
            <div className="uk-height-1-1">
                <div className="uk-background-cover uk-background-center-center uk-height-1-1 ev-section-padding-v-s uk-panel uk-flex uk-flex-wrap uk-flex-middle uk-flex-center uk-light">
                    <div className="uk-overlay ev-overlay-secondary uk-position-cover"></div>

                    <div className="ev-auth-2 uk-position-z-index">

                        <a href="http://">
                            <img className="ev-logo" src={logo_trang}/>
                        </a>

                        <h5 className="uk-heading-line"><span>Đăng nhập</span></h5>

                        <form>
                            <div className="uk-margin">
                                <div className="uk-width-1-1 uk-inline">
                                    <input className="uk-input uk-border-pill" placeholder="Email" type="text"/>
                                </div>
                            </div>
                            <div className="uk-margin">
                                <div className="uk-width-1-1 uk-inline">
                                    <input className="uk-input uk-border-pill" placeholder="Password" type="text"/>
                                </div>
                            </div>

                            <div className="uk-margin uk-text-left padding-h uk-text-small  uk-preserve-color">
                                <label>
                                    Bạn là: 
                                    <input className="uk-checkbox owner padding-left" type="checkbox" />Chủ trọ
                                    <input className="uk-checkbox nonowner padding-left" type="checkbox" />Người thuê trọ
                                </label>
                            </div>

                            <div className="uk-margin uk-text-left padding-h uk-text-small  uk-preserve-color">
                                <label><input className="uk-checkbox" type="checkbox"/> Nhớ mật khẩu</label>
                            </div>

                            <button className="uk-button uk-width-1-1 uk-border-pill">Đăng nhập</button>

                            <div className="uk-margin uk-width-1-1 uk-text-small">
                            Bạn chưa có tài khoản? <a className="ev-link-primary uk-text-bold" href="signup-2.html">Đăng ký</a>
                            <a className="uk-margin uk-display-block" href="forgot-2.html*">Quên mật khẩu?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;