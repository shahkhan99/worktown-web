import React, { useState, useEffect } from "react";
import "./dashboardloginsignup.css";
import { getUsers, handleLogin, ResetPassword, getEmployees } from "./backend";
import { useSelector, useDispatch } from "react-redux";
import { set_current_user_data } from "../../store/action/index";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../../assets/Loader/worktown-loader.gif";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function DashboardLogin() {
  const redux_data = useSelector((state) => state.dashboard_auth);
  // console.log(redux_data);
  const dispatch = useDispatch();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVerify, setEmailVerify] = useState(true);
  const [checkUser, setCheckUser] = useState("");
  // const [Employee, setEmployee] = useState("");
  const [checking, setChecking] = useState(true);
  const [type, setType] = useState(false);

  useEffect(async () => {
    await getUsers(setCheckUser);
    // await getEmployees(setCheckUser);
    if (checkUser === "") {
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
            dispatch(set_current_user_data(result));
            // window.location.replace("http://localhost:3000/portal/");
            // console.log("run");
          }

          // ...
        } else {
          // User is signed out
          setChecking(false);
          // ...
        }
      });
    }
  }, []);

  // console.log(checkUser);
  const set_data = (user) => {
    // dispatch(set_current_user_data(user));
  };
  const ShowPassword = () => {
    var x = document.getElementById("pass_show");

    if (x.type === "password") {
      x.type = "text";
      setType(true);
    } else {
      x.type = "password";
      setType(false);
    }
  };

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
        <h3 style={{ height: "13%" }}>Login</h3>
        <div className="dash-login-main-div-inner">
          {/* <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onKeyPress={(e) => console.log(e)}
          > */}
          <div className="a-input-field dash-login-main-div-input">
            <label className="input-label1">
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
            <div className="div-input-icon div-input-icon_login">
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
                  marginBottom: 5,
                }}
                // value={this.state.name}
                className="a-r-input-box"
              />
            </div>
          </div>
          <div className="a-input-field dash-login-main-div-input ">
            <label className="input-label1">
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
            <div className="div-input-icon div-input-icon_login">
              <input
                placeholder="password"
                id="pass_show"
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
                  marginBottom: 5,
                }}
                // value={this.state.name}
                className="a-r-input-box dash-login-main-div-input-pass "
                onKeyPress={(e) =>
                  e.charCode === 13 &&
                  handleLogin(
                    checkUser,
                    email,
                    emailVerify,
                    setEmailVerify,
                    password,
                    set_data
                  )
                }
              />
              {type ? (
                <AiFillEye
                  color="#3D459D"
                  size={25}
                  style={{ marginRight: 15, cursor: "pointer" }}
                  onClick={() => ShowPassword()}
                />
              ) : (
                <AiFillEyeInvisible
                  color="#3D459D"
                  size={25}
                  style={{ marginRight: 15, cursor: "pointer" }}
                  onClick={() => ShowPassword()}
                />
              )}
            </div>
          </div>
          <div className="dash-login-main-div-btn">
            <button
              onClick={() =>
                handleLogin(
                  checkUser,
                  email,
                  emailVerify,
                  setEmailVerify,
                  password,
                  set_data
                )
              }
            >
              Login
            </button>
          </div>
          {/* </form> */}
          <div>
            <a href="/portal/registration" target="_blank">
              <p>Haven't set your password yet? Do it here!</p>
            </a>
            <a onClick={() => ResetPassword(email)}>
              <p
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  cursor: "pointer",
                  color: "blueviolet",
                }}
              >
                Forgot Password?
              </p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
