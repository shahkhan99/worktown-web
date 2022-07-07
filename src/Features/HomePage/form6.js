import React, { Component } from "react";
import { handleRegister } from "../../Components/DashboardLoginSignup/backend/index";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default class Form6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      cPassword: "",
      type: false,
    };
  }
  handleDone = (email) => {
    let { cPassword, password } = this.state;
    // console.log(password, cPassword, email);
    handleRegister(email, password, cPassword);
  };
  ShowPassword = () => {
    var x = document.getElementById("pass_show");
    var x1 = document.getElementById("pass_show1");
    if (x.type === "password" && x1.type === "password") {
      x.type = "text";
      x1.type = "text";
      this.setState({ type: true });
    } else {
      x.type = "password";
      x1.type = "password";
      this.setState({ type: false });
    }
  };
  render() {
    const ctx = this.props.ctx;
    const fullpageApi = this.props.fullpageApi;
    // console.log(ctx);
    return (
      <div className="salary-div1">
        <h1>Let's get access to your portal</h1>
        <div
          class="a-upper-input"
          style={ctx.state.employee ? {} : { marginTop: 20 }}
        >
          <div className="a-input-field">
            <label className="input-label">
              Email
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>{" "}
            </label>
            <div className="div-input-icon">
              <HiOutlineMail
                color="#3D459D"
                size={20}
                className="svg-m"
                style={{
                  position: "relative",
                  top: 14,
                  left: 10,
                }}
              />
              <input
                disabled
                id="email"
                name="email"
                value={ctx.state.email}
                type="email"
                // placeholder="We need your full name"
                style={{
                  fontFamily: "Lato",
                  fontSize: 17,
                  color: "#868686",
                }}
                className="a-r-input-box"
              />
            </div>
          </div>
          <div className="a-input-field">
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
            <div className="div-input-icon div-input-icon_reg">
              <RiLockPasswordLine
                color="#3D459D"
                size={20}
                className="svg-u1"
                style={{
                  position: "relative",
                  top: -2,
                  left: 10,
                }}
              />
              <input
                placeholder="Password"
                id="pass_show"
                name="name"
                type="password"
                // placeholder="We need your full name"
                style={{
                  fontFamily: "Lato",
                  fontSize: 17,
                  color: "#868686",
                  height: "auto",
                  margin: 0,
                }}
                // value={this.state.name}
                className="a-r-input-box"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              {this.state.type ? (
                <AiFillEye
                  color="#3D459D"
                  size={25}
                  style={{ marginRight: 15, cursor: "pointer" }}
                  onClick={() => this.ShowPassword()}
                />
              ) : (
                <AiFillEyeInvisible
                  color="#3D459D"
                  size={25}
                  style={{ marginRight: 15, cursor: "pointer" }}
                  onClick={() => this.ShowPassword()}
                />
              )}
            </div>
          </div>
          <div className="a-input-field">
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
            <div className="div-input-icon div-input-icon_reg">
              <RiLockPasswordLine
                color="#3D459D"
                size={20}
                className="svg-u1"
                style={{
                  position: "relative",
                  top: -2,
                  left: 10,
                }}
              />
              <input
                placeholder="Confirm password"
                id="pass_show1"
                name="name"
                type="password"
                // placeholder="We need your full name"
                style={{
                  fontFamily: "Lato",
                  fontSize: 17,
                  color: "#868686",
                  height: "auto",
                  margin: 0,
                }}
                // value={this.state.name}
                onChange={(e) => this.setState({ cPassword: e.target.value })}
                className="a-r-input-box"
              />{" "}
              {this.state.type ? (
                <AiFillEye
                  color="#3D459D"
                  size={25}
                  style={{ marginRight: 15, cursor: "pointer" }}
                  onClick={() => this.ShowPassword()}
                />
              ) : (
                <AiFillEyeInvisible
                  color="#3D459D"
                  size={25}
                  style={{ marginRight: 15, cursor: "pointer" }}
                  onClick={() => this.ShowPassword()}
                />
              )}
            </div>
          </div>

          <div className="div-btn-2">
            <button
              type="button"
              class="done-btn-home-page "
              onClick={() => this.handleDone(ctx.state.email)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
}
