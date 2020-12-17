import react, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import reactDOM from "react-dom";
import "../css/login.css";
import logo_trang from "../image/logo_ngang_trang.png";
import Home from "./Home";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "owner",
      status: "",
      userData: {},
      isLoggedIn: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.changeNavbarState(false);
    //check if logged in so move to home
    this.setState({
        isLoggedIn: this.props.isLoggedIn,
        userData: this.props.userData
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    let url = "";
    this.state.userType === "owner"
      ? (url = "https://accommodation-finder.herokuapp.com/owner/login")
      : (url = "https://accommodation-finder.herokuapp.com/renter/login");
    
    await axios
      .post(url, { email: this.state.email, password: this.state.password })
      .then((res) => {
        //Saving tolken to local storage
        localStorage.setItem(`token`,res.data[this.state.userType].tokens[res.data[this.state.userType].tokens.length - 1].token);
        localStorage.setItem(`userType`,this.state.userType);
        this.setState({
          userData: {...res.data[this.state.userType], userType: this.state.userType},
          isLoggedIn: true,
        });
        this.props.updateLoginState(
          this.state.userData,
          this.state.isLoggedIn
        );
      });
      console.log('after login: ', this.state.userData)
  }

  render() {
    return (
      <>
        {!this.state.isLoggedIn && (
          <div className="login-height-1-1">
            <div className="login-background-cover login-height-1-1 login-flex login-light">
              <div className="login-overlay-secondary login-position-cover"></div>

              <div className="login-auth-2 login-position-z-index">
                <NavLink activeStyle={{ color: "#fff" }} to="/home">
                  <img className="login-logo" src={logo_trang} />
                </NavLink>

                <h5 className="login-heading-line">
                  <span>Đăng nhập</span>
                </h5>

                <form onSubmit={this.handleSubmit}>
                  <div className="login-margin">
                    <div className="login-inline">
                      <input
                        className="login-input login-border-pill"
                        placeholder="Email"
                        type="email"
                        required
                        onChange={(event) => {
                          this.setState({ email: event.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="login-margin">
                    <div className="login-inline">
                      <input
                        className="login-input login-border-pill"
                        placeholder="Password"
                        type="password"
                        minLength="8"
                        required
                        onChange={(event) => {
                          this.setState({ password: event.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div className="login-margin login-text-left login-text-small">
                    Bạn là:
                    <input
                      className="login-radio margin"
                      type="radio"
                      name="typeUser"
                      id="owner"
                      required
                      onChange={() => this.setState({ userType: "owner" })}
                    />
                    <label>Chủ trọ</label>
                    <input
                      className="login-radio margin"
                      type="radio"
                      name="typeUser"
                      id="renter"
                      onChange={() => this.setState({ userType: "renter" })}
                    />
                    <label>Người thuê trọ</label>
                  </div>

                  <div className="login-margin login-text-left login-text-small">
                    <label>
                      <input className="login-checkbox" type="checkbox" /> Nhớ
                      mật khẩu
                    </label>
                  </div>
                  <button className="login-button login-border-pill">
                    Đăng nhập
                  </button>

                  <div className="login-margin login-text-small">
                    <p
                      style={{
                        fontStyle: "italic",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {this.state.status}
                    </p>
                    Bạn chưa có tài khoản? {" "}
                    <NavLink
                      className="login-link-primary login-text-bold"
                      activeStyle={{ color: "#fff" }}
                      to="/signup"
                    >
                      Đăng ký
                    </NavLink>
                    <NavLink className="login-margin login-display-block" activeStyle={{ color: "#fff" }} to="/resetpassword">Quên mật khẩu?</NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {this.state.isLoggedIn && <Redirect to="/home" />}
      </>
    );
  }
}

export default Login;
