import { Component } from "react";

import Cookies from "js-cookie";

import { Redirect } from "react-router-dom";

import "./index.css";

class Login extends Component {
  state = {
    loginEmail: "",
    loginPassword: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  onChangeEmail = (event) => {
    this.setState({ loginEmail: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ loginPassword: event.target.value });
  };

  onSubmitLogin = async (event) => {
    event.preventDefault();
    const { loginEmail, loginPassword } = this.state;
    const loginDetails = { loginEmail, loginPassword };
    const url = "https://reqres.in/api/login";
    const options = {
      method: "POST",
      body: JSON.stringify(loginDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error);
    }
  };

  onRegister = () => {
    const { history } = this.props;
    history.replace("/register");
  };

  render() {
    const { showSubmitError, errorMsg, loginEmail, loginPassword } = this.state;
    return (
      <div className="login-container">
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitLogin}>
            <label htmlFor="Email" className="label">
              Enter Your Email
            </label>
            <input
              type="text"
              id="Email"
              value={loginEmail}
              placeholder="Enter your email"
              className="input"
              onChange={this.onChangeEmail}
            />
            <label htmlFor="Password" className="label">
              Enter Your Password
            </label>
            <input
              type="password"
              id="Password"
              value={loginPassword}
              placeholder="Enter your password"
              className="input"
              onChange={this.onChangePassword}
            />
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="register-para">
              Not a Member{" "}
              <span className="span-register" onClick={this.onRegister}>
                Register here?
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
