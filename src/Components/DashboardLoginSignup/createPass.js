import React, { useState, useEffect } from "react";
import "./dashboardloginsignup.css";
import { getUsers } from "./backend";
import Swal from "sweetalert2";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export default function CreatePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [checkUser, setCheckUser] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  useEffect(async () => {
    await getUsers(setCheckUser);
    console.log(checkUser);
  }, []);

  const handleEmail = async () => {
    const getObjs = (obj) => Object.values(checkUser);
    let users = getObjs(checkUser);
    let gotEmail = users.filter((e) => {
      return e.Email === email;
    });
    gotEmail.length && setShowPass(true);
    gotEmail.length && setEmailCheck(true);
    if (!gotEmail.length) {
      Swal.fire({
        title:
          "Umm.. we can't seem to find your email in our database. Please double check the spelling or sign up to access the portal.",
        showCancelButton: true,
        confirmButtonText: "Sign Up",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("http://localhost:3000/");
        }
      });
    }
    console.log(gotEmail);
  };
  const handleLogin = async () => {
    if (password === cPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, "/////", errorMessage);
          Swal.fire({
            title:
              error.message ===
              "Firebase: Password should be at least 6 characters (auth/weak-password)."
                ? "Password should be at least 6 characters"
                : error.message ===
                  "Firebase: Error (auth/email-already-in-use)."
                ? "Entered email is already in use by another account."
                : error.message === "Firebase: Error (auth/invalid-email)."
                ? "Invalid Email address"
                : error.message,
            timer: 5000,
          });
        });
    } else {
      Swal.fire({
        title: "Passwords are not same.",
        timer: 2500,
      });
    }
  };
  return (
    <div className="dash-login-main-div">
      <h3 style={{ height: "13%" }}>Create Password </h3>
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
            <button onClick={handleEmail}>Next</button>
          </div>
        ) : (
          <div className="dash-login-main-div-btn">
            <button onClick={handleLogin}>Login</button>
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
