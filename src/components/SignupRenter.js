import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
// import "../css/unikit.css";
import "../css/SignupRenter.css";
import logo from "../image/logo_ngang_trang.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class SignupRenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      userType: "renter",
      userData: {},
      isLoggedIn: false,
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.changeNavbarState(false);
  }

  handleRegister = async (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    
    await handleSignUp({
      userType: "renter",
      data: {
        name,
        email,
        password
      }
    }).then((res) => {
      //res);
      if (res.data.response) {
        toast.info(res.data.response, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        location.href = '/'
      } else {
        toast.error(res.data.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      
    })
    .catch((err) => console.log(err));
  //Send notification đăng ký thành công
  };

  render() {
    return (
      <div className="signupRenter-background-cover signupRenter-height-1-1 signupRenter-flex signupRenter-light">
        <div className="signupRenter-overlay-secondary signupRenter-position-cover"></div>

        <div className="signupRenter-auth-2 signupRenter-position-z-index">
          <NavLink activeStyle={{ color: "#fff" }} to="/home">
            <img className="signupRenter-logo" src={logo} />
          </NavLink>
          <h5 className="signupRenter-heading-line">
            <span>Đăng ký</span>
          </h5>

          <form onSubmit={this.handleRegister}>
            <div className="signupRenter-margin">
              <div className="signupRenter-width-1-1 signupRenter-inline">
                <input
                  className="signupRenter-input signupRenter-border-pill"
                  placeholder="Name"
                  type="text"
                  required
                  onChange={(event) => {
                    this.setState({ name: event.target.value });
                  }}
                />
              </div>
            </div>
            <div className="signupRenter-margin">
              <div className="signupRenter-width-1-1 signupRenter-inline">
                <input
                  className="signupRenter-input signupRenter-border-pill"
                  placeholder="Email"
                  type="email"
                  required
                  onChange={(event) => {
                    this.setState({ email: event.target.value });
                  }}
                />
              </div>
            </div>
            <div className="signupRenter-margin">
              <div className="signupRenter-width-1-1 signupRenter-inline">
                <input
                  className="signupRenter-input signupRenter-border-pill"
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

            <div className="signupRenter-margin">
              <div className="signupRenter-width-1-1 padding-h signupRenter-inline signupRenter-text-left signupRenter-text-small">
                <label>
                  <input
                    className="signupRenter-checkbox"
                    type="checkbox"
                    required
                  />
                  Tôi đồng ý với
                  <a
                    style={{ paddingLeft: "5px" }}
                    className="signupRenter-link-primary"
                    href="#"
                  >
                    Các điều khoản và điều kiện
                  </a>
                </label>
              </div>
            </div>

            <button className="signupRenter-button signupRenter-width-1-1 signupRenter-border-pill">
              Đăng ký
            </button>

            <div className="signupRenter-margin signupRenter-width-1-1 signupRenter-text-small">
              Bạn đã có tài khoản?{" "}
              <NavLink
                className="signupRenter-link-primary signupRenter-text-bold"
                activeStyle={{ color: "#fff" }}
                to="/login"
                onClick={this.props.changeNavbarState}
              >
                Đăng nhập
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupRenter;
