import React, { Component } from "react";
import Logo from "../../../assets/Logo/logo.png";
import {
  handleModeChange,
  handleLoginChangeBtn,
} from "../functions/homeFunctions";
import Vector1 from "../../../assets/Vectors/vector1.png";

export default class Form0 extends Component {
  render() {
    const ctx = this.props.ctx;
    const fullpageApi = this.props.fullpageApi;
    // console.log(ctx);
    return (
      <div className="section section1">
        <div className="header">
          <div className="top">
            <div className="logo">
              <img src={Logo} className="header-logo" />
            </div>
            <div className="wait-btn-main-div goto_portal_btn">
              <div
                className="wait-button wait-btn "
                onClick={() => handleLoginChangeBtn(window)}
              >
                Portal
              </div>
            </div>
          </div>
          <div className="center_bottom_mix">
            <div className="center">
              <h1>
                Building Pakistan’s <h1 className="italic">supercommunity</h1>{" "}
                of professionals
              </h1>
              <div className="wait-btn-main-div">
                <div
                  className="wait-button wait-btn"
                  onClick={() => handleModeChange("Employee", fullpageApi, ctx)}
                  style={
                    ctx.state.wantedCategorySelectionErr
                      ? { border: "2px solid red" }
                      : ctx.state.wantedCategorySelection && ctx.state.employee
                      ? { backgroundColor: "#ffe26f" }
                      : {}
                  }
                >
                  I want to work
                </div>
                <div
                  className="wait-button wait-btn"
                  onClick={() => handleModeChange("Employer", fullpageApi, ctx)}
                  style={
                    ctx.state.wantedCategorySelectionErr
                      ? { border: "2px solid red" }
                      : ctx.state.wantedCategorySelection && ctx.state.employer
                      ? { backgroundColor: "#ffe26f" }
                      : {}
                  }
                >
                  I want to hire
                </div>
              </div>
            </div>
            <div className="bottom">
              <img src={Vector1} className="header-vector" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
