import React, { Component } from "react";
import Logo from "../../../assets/Logo/logo.png";
import Vector9 from "../../../assets/Vectors/vector9.png";
import $ from "jquery";
import ArrowIcon from "../../../assets/icons/up-arrow.png";

export default class Form7 extends Component {
  render() {
    return (
      <div className="section">
        <div className="last-section">
          <div className="last-vector">
            <h1>It takes a town to make great things happen</h1>
            <img src={Vector9} className="last-vector-image" />
            <div
              onClick={() =>
                $("html, body").animate({ scrollTop: 0 }, "normal")
              }
              className="top-btn up "
            >
              <img
                src={ArrowIcon}
                onClick={() =>
                  $("html, body").animate({ scrollTop: 0 }, "normal")
                }
                style={{ height: "55px", width: "60px" }}
              />
            </div>
          </div>

          <div className="last-line">
            <div className="logo">
              <img src={Logo} className="simple-logo" />
              <p className="last-text">
                Copyright © 2022. All rights reserved.
              </p>
            </div>

            <div className="wait-btn-main-div"></div>
          </div>
        </div>
      </div>
    );
  }
}
