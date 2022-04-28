import React, { Component } from "react";
import { handleRegister } from "../../Components/DashboardLoginSignup/backend/index";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

export default class Form6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      cPassword: "",
    };
  }
  handleDone = (email) => {
    let { cPassword, password } = this.state;
    // handleRegister(email, password, cPassword);
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
                value={ctx.props.email}
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
            <div className="div-input-icon">
              <RiLockPasswordLine
                color="#3D459D"
                size={17}
                className="svg-u"
                style={{
                  position: "relative",
                  top: 13,
                  left: 10,
                }}
              />
              <input
                placeholder="Password"
                id="name"
                name="name"
                type="password"
                // placeholder="We need your full name"
                style={{
                  fontFamily: "Lato",
                  fontSize: 17,
                  color: "#868686",
                  height: "auto",
                }}
                // value={this.state.name}
                className="a-r-input-box"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
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
            <div className="div-input-icon">
              <RiLockPasswordLine
                color="#3D459D"
                size={17}
                className="svg-u"
                style={{
                  position: "relative",
                  top: 13,
                  left: 10,
                }}
              />
              <input
                placeholder="Confirm password"
                id="name"
                name="name"
                type="password"
                // placeholder="We need your full name"
                style={{
                  fontFamily: "Lato",
                  fontSize: 17,
                  color: "#868686",
                  height: "auto",
                }}
                // value={this.state.name}
                onChange={(e) => this.setState({ cPassword: e.target.value })}
                className="a-r-input-box"
              />
            </div>
          </div>

          <div className="div-btn-2">
            <button
              type="button"
              class="done-btn-home-page "
              onClick={() => this.handleDone(ctx.props.email)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
}
