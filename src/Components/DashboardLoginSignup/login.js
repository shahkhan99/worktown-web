import React, { useState, useEffect } from "react";
import "./dashboardloginsignup.css";
import { getUsers } from "./backend";
import Swal from "sweetalert2";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { async } from "@firebase/util";

const auth = getAuth();
export default function DashboardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailNotVerify, setEmailNotVerify] = useState(false);
  const [checkUser, setCheckUser] = useState("");

  useEffect(async () => {
    await getUsers(setCheckUser);
    console.log(checkUser);
  }, []);

  const handleLogin = async () => {
    const getObjs = (obj) => Object.values(checkUser);
    let users = getObjs(checkUser);
    let gotEmail = users.filter((e) => {
      return e.Email === email;
    });
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
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (!user.emailVerified) {
            Swal.fire({
              title:
                "It seems like you haven't verify your email yet. We have sent a verification link to your email, kindly verify it to access the portal.",
              showCancelButton: true,
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                setEmailNotVerify(true);
              }
            });
            // sendEmailVerification(user);
          } else {
            setEmailNotVerify(false);
            console.log("then =>", user);
          }
          // console.log("then =>", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Err =>", errorMessage);
        });
      console.log("then =>", emailNotVerify);
    }
  };
  return (
    <div className="dash-login-main-div">
      <h3 style={{ height: "13%" }}>Login</h3>
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
          <button onClick={() => handleLogin()}>Login</button>
        </div>

        <div>
          <a href="/employer_dashboard/registration" target="_blank">
            <p>Haven't set your password yet? Do it here!</p>
          </a>
        </div>
      </div>
    </div>
  );
}
