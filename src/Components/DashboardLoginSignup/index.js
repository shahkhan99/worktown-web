import React, { useState, useEffect } from "react";
import "./dashboardloginsignup.css";
import { getUsers } from "./backend";

export default function DashboardLoginSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkUser, setCheckUser] = useState("");

  useEffect(async () => {
    await getUsers(setCheckUser);
  }, []);

  const handleLogin = async () => {
    const getObjs = (obj) => Object.values(checkUser);
    let users = getObjs(checkUser);
    let gotEmail = users.filter((e) => {
      return e.Email === email;
      // console.log(check);
    });

    console.log(gotEmail);
  };
  return (
    <div className="dash-login-main-div">
      <h3 style={{ height: "13%" }}>LOGIN</h3>
      <div className="dash-login-main-div-inner">
        <div className="a-input-field dash-login-main-div-input">
          <label className="input-label">
            Email
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              *
            </span>
          </label>
          <div className="div-input-icon">
            {/* <FaRegUser
            color="#3D459D"
            size={17}
            className="svg-u"
            style={{
              position: "relative",
              top: 13,
              left: 10,
            }}
          /> */}
            <input
              placeholder="your email address"
              onChange={(email) => {
                setEmail(email.target.value);
              }}
              type="email"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              // value={this.state.name}
              className="a-r-input-box"
            />
          </div>
        </div>
        <div className="a-input-field dash-login-main-div-input ">
          <label className="input-label">
            Password
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              *
            </span>
          </label>
          <div className="div-input-icon">
            {/* <FaRegUser
            color="#3D459D"
            size={17}
            className="svg-u"
            style={{
              position: "relative",
              top: 13,
              left: 10,
            }}
          /> */}
            <input
              placeholder="password"
              id="name"
              name="name"
              onChange={(pass) => {
                setPassword(pass.target.value);
              }}
              type="password"
              // placeholder="We need your full name"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              // value={this.state.name}
              className="a-r-input-box dash-login-main-div-input-pass "
            />
          </div>
        </div>
        <div className="dash-login-main-div-btn">
          <button onClick={handleLogin}>Login</button>
        </div>
        <div>
          <a href="/" target="_blank">
            <p>Don't have an account? Sign Up here!</p>
          </a>
        </div>
      </div>
    </div>
  );
}
