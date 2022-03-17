import React, { useState, useEffect } from "react";
import "./dashboardloginsignup.css";
import { getUsers, handleEmail, handleRegister } from "./backend";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Loading from "../../assets/Loader/worktown-loader.gif";

export default function DashboardLoginSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [checkUser, setCheckUser] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [checking, setChecking] = useState(true);

  const auth = getAuth();

  useEffect(async () => {
    await getUsers(setCheckUser);
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uEmail = user.email;
        if (uEmail) {
          await getUsers(setCheckUser);
          const getObjs = (obj) => Object.values(checkUser);
          let users = getObjs(checkUser);
          let gotEmail = users.filter((e) => {
            return e.Email === uEmail;
          });
          var result = gotEmail.find((obj) => {
            return obj.Email === uEmail;
          });
          console.log(result);
          dispatch(set_current_user_data(result));
          window.location.replace("http://localhost:3000/employer_dashboard/");
        }
        // ...
      } else {
        // User is signed out
        // ...
        console.log(result);
        setChecking(false);
      }
    });
  }, []);
  console.log(checkUser);

  if (checking) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Loading} />
      </div>
    );
  } else {
    return (
      <div className="dash-login-main-div">
        <h3 style={{ height: "13%" }}>Create Password</h3>
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
          <div
            className="a-input-field dash-login-main-div-input "
            style={showPass ? { display: "flex" } : { display: "none" }}
          >
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
          <div
            className="a-input-field dash-login-main-div-input "
            style={showPass ? { display: "flex" } : { display: "none" }}
          >
            <label className="input-label">
              Confirm Password
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
                placeholder="confirm password"
                id="name"
                name="name"
                onChange={(pass) => {
                  setCPassword(pass.target.value);
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
          {!emailCheck ? (
            <div className="dash-login-main-div-btn">
              <button
                onClick={() =>
                  handleEmail(email, checkUser, setShowPass, setEmailCheck)
                }
              >
                Next
              </button>
            </div>
          ) : (
            <div className="dash-login-main-div-btn">
              <button
                onClick={() => handleRegister(email, password, cPassword)}
              >
                Login
              </button>
            </div>
          )}
          <div>
            <a href="/" target="_blank">
              <p>Don't have an account? Sign Up here!</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
