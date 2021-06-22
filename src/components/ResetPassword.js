import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import "../css/ResetPassword.css";
import logo from "../image/logo_ngang_trang.png";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.changeNavbarState(false);
  }

  render() {
    return (
      <div className="resetPassword-background-cover resetPassword-height-1-1 resetPassword-flex resetPassword-light">
        <div className="resetPassword-overlay-secondary resetPassword-position-cover"></div>

        <div className="resetPassword-auth-2 resetPassword-position-z-index">
          <NavLink activeStyle={{ color: "#fff" }} to="/home">
            <img className="resetPassword-logo" src={logo} />
          </NavLink>
          <h5 className="resetPassword-heading-line">
            <span>Lấy lại mật khẩu</span>
          </h5>

          <form>
            <div className="resetPassword-margin">
              <div className="resetPassword-width-1-1 resetPassword-inline">
                <input
                  className="resetPassword-input resetPassword-border-pill"
                  placeholder="Email"
                  type="email"
                  required="required"
                />
              </div>
            </div>

            <button className="resetPassword-button resetPassword-width-1-1 resetPassword-border-pill">
              Enter
            </button>

            <div className="resetPassword-margin resetPassword-width-1-1 resetPassword-text-small">
              Quay lại {" "}
              <NavLink
                className="resetPassword-link-primary resetPassword-text-bold"
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

export default ResetPassword;
