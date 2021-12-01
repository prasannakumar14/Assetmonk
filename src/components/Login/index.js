import { Component } from "react";

import Cookies from "js-cookie";

import { Redirect } from "react-router-dom";

import "./index.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
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
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const loginDetails = { email, password };
    const url = "https://reqres.in/api/login";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(loginDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.token);
    } else {
      this.onSubmitFailure(data.error);
    }
  };

  onRegister = () => {
    const { history } = this.props;
    history.replace("/register");
  };

  render() {
    const { showSubmitError, errorMsg, email, password } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
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
              value={email}
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
              value={password}
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
