import react, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from "react-router-dom";
import reactDOM from 'react-dom';
import "../css/login.css";
import logo_trang from '../image/logo_ngang_trang.png';
import Home from './Home';


class Login extends Component {
    constructor(props){
        super(props)
        this.state = ({
            email: "",
            password: "",
            userType: "owner",
            status: "",
        })
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.props.changeNavbarState(false);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.updateLoginState({userType: this.state.userType}, true)
        console.log(this.state)
    }

    render(){
        const isLoggedIn = this.props.isLoggedIn;
        console.log(isLoggedIn)
        return(
            <>
            {!isLoggedIn && <div className="login-height-1-1">
                <div className="login-background-cover login-height-1-1 login-flex login-light">
                    <div className="login-overlay-secondary login-position-cover"></div>

                    <div className="login-auth-2 login-position-z-index">
                        <NavLink  activeStyle={{color:'#fff'}} to="/home"><img className="login-logo" src={logo_trang}/></NavLink>
                    
                        <h5 className="login-heading-line"><span>Đăng nhập</span></h5>

                        <form onSubmit={this.handleSubmit}>
                            <div className="login-margin">
                                <div className="login-inline">
                                    <input className="login-input login-border-pill" placeholder="Email" type="text" required onChange = {event => {this.setState({email: event.target.value})}}/>
                                </div>
                            </div>
                            <div className="login-margin">
                                <div className="login-inline">
                                    <input className="login-input login-border-pill" placeholder="Password" type="password" required onChange = {event => {this.setState({password: event.target.value})}}/>
                                </div>
                            </div>

                            <div className="login-margin login-text-left login-text-small">
                                    Bạn là: 
                                    <input className="login-radio margin" type="radio" name="typeUser" id = "owner" required onChange={() => this.setState({userType: "owner"})}/>
                                    <label for="owner">Chủ trọ</label>
                                    <input className="login-radio margin" type="radio" name="typeUser" id = "renter" onChange={() => this.setState({userType: "renter"})}/>
                                    <label for="renter">Người thuê trọ</label>
                            </div>

                            <div className="login-margin login-text-left login-text-small">
                                <label><input className="login-checkbox" type="checkbox"/> Nhớ mật khẩu</label>
                            </div>
                            <button className="login-button login-border-pill">Đăng nhập</button>

                            <div className="login-margin login-text-small">
                            Bạn chưa có tài khoản? <NavLink className="login-link-primary login-text-bold" activeStyle={{color:'#fff'}} to="/signup" onClick = {this.props.changeNavbarState}>Đăng ký</NavLink>
                            <a className="login-margin login-display-block" href="forgot-2.html*">Quên mật khẩu?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
            {isLoggedIn && <Redirect to='/home' />}
            </>
        )
    }
}

export default Login;