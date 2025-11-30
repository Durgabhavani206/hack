import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { BASEURL } from "./lib"; // use the updated BASEURL
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: { email: "", password: "" },
      signupData: { firstName: "", lastName: "", email: "", password: "", role: "" },
      action: "Login",
      redirectTo: null,
    };
  }

  handleLoginChange = (e) => {
    const { name, value } = e.target;
    this.setState({ loginData: { ...this.state.loginData, [name]: value } });
  };

  handleSignupChange = (e) => {
    const { name, value } = e.target;
    this.setState({ signupData: { ...this.state.signupData, [name]: value } });
  };

  login = async () => {
    try {
      const response = await fetch(`${BASEURL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.loginData),
      });

      const resJson = await response.json();

      if (resJson.success) {
        const { role } = resJson.user;
        let path = "/";
        if (role === "Admin") path = "/admin";
        else if (role === "Lender") path = "/lender";
        else if (role === "Borrower") path = "/borrower";
        else if (role === "Analyst") path = "/analyst";

        this.setState({ redirectTo: path });
      } else {
        alert(resJson.message);
      }
    } catch (error) {
      alert("Login failed: " + error);
    }
  };

  signup = async () => {
    try {
      const response = await fetch(`${BASEURL}signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.signupData),
      });

      const resJson = await response.json();
      alert(resJson.message);

      if (resJson.success) {
        this.setState({
          signupData: { firstName: "", lastName: "", email: "", password: "", role: "" },
          action: "Login",
        });
      }
    } catch (error) {
      alert("Signup failed: " + error);
    }
  };

  render() {
    if (this.state.redirectTo) {
      return <Navigate to={this.state.redirectTo} />;
    }

    return (
      <div className="container">
        <div className="login-signup-box">
          <h2>{this.state.action}</h2>

          {this.state.action === "Login" ? (
            <>
              <input type="email" placeholder="Email" name="email" value={this.state.loginData.email} onChange={this.handleLoginChange} />
              <input type="password" placeholder="Password" name="password" value={this.state.loginData.password} onChange={this.handleLoginChange} />
              <button onClick={this.login}>Login</button>
              <p>
                Don't have an account?{" "}
                <span onClick={() => this.setState({ action: "Signup" })}>Signup</span>
              </p>
            </>
          ) : (
            <>
              <input type="text" placeholder="First Name" name="firstName" value={this.state.signupData.firstName} onChange={this.handleSignupChange} />
              <input type="text" placeholder="Last Name" name="lastName" value={this.state.signupData.lastName} onChange={this.handleSignupChange} />
              <input type="email" placeholder="Email" name="email" value={this.state.signupData.email} onChange={this.handleSignupChange} />
              <input type="password" placeholder="Password" name="password" value={this.state.signupData.password} onChange={this.handleSignupChange} />
              <select name="role" value={this.state.signupData.role} onChange={this.handleSignupChange}>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Lender">Lender</option>
                <option value="Borrower">Borrower</option>
                <option value="Analyst">Analyst</option>
              </select>
              <button onClick={this.signup}>Signup</button>
              <p>
                Already have an account?{" "}
                <span onClick={() => this.setState({ action: "Login" })}>Login</span>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
}
