import { Component } from "react";

import "./index.css";

class Register extends Component {
  state = {
    registerEmail: "",
    registerPassword: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeEmail = (event) => {
    this.setState({ registerEmail: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ registerPassword: event.target.value });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  onSubmitRegister = async (event) => {
    event.preventDefault();
    const { registerEmail, registerPassword } = this.state;
    const registerDetails = { registerEmail, registerPassword };

    const url = "https://reqres.in/api/register";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(registerDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(response);
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error);
    }
  };

  onLogin = () => {
    const { history } = this.props;
    history.replace("/login");
  };

  render() {
    const {
      showSubmitError,
      errorMsg,
      registerEmail,
      registerPassword,
    } = this.state;
    return (
      <div className="register-container">
        <div className="register-form-container">
          <form className="form-container" onSubmit={this.onSubmitRegister}>
            <label htmlFor="Email" className="label">
              Enter Your Email
            </label>
            <input
              type="text"
              id="Email"
              value={registerEmail}
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
              value={registerPassword}
              placeholder="Enter your password"
              className="input"
              onChange={this.onChangePassword}
            />
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Register
            </button>
            <p className="register-para">
              Already a member{" "}
              <span className="span-register" onClick={this.onLogin}>
                Login here?
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
