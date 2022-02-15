import React, { Component } from "react";
import {
  emailCheck,
  nameCheck,
  phoneCheck,
  cityCheck,
  companyCheck,
} from "./validation";
import male from "../../assets/icons/male-student.png";
import female from "../../assets/icons/woman.png";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import Select from "react-select";

export default class Form3 extends Component {
  render() {
    const ctx = this.props.ctx;
    const fullpageApi = this.props.fullpageApi;
    const data = this.props.data;
    // console.log(ctx);

    let {
      company,
      name,
      city,
      email,
      phone,
      error,
      selected,
      selectedSal,
      timings,
      Saltimings,
      job_options,
      defSkills,
    } = ctx.state;
    let {
      name: nameError,
      city: occError,
      email: emailError,
      phone: phoneError,
      company: companyError,
    } = ctx.state.errorMessage;
    return (
      <div className={ctx.state.part1 ? "intro" : "intro_off"}>
        <h1>Your Introduction</h1>
        <div
          className="radio-div"
          style={ctx.state.employer ? { display: "none" } : {}}
        >
          <div
            className={ctx.state.male ? "radio-male" : "radio-in"}
            onClick={() => ctx.handleMale()}
            style={
              ctx.state.radTErr
                ? { border: "1px solid red" }
                : { borderWidth: 0 }
            }
          >
            <img
              src={male}
              style={{
                width: 50,
                height: 50,
                marginBottom: 5,
              }}
            />
            Male
          </div>
          <div
            className={ctx.state.female ? "radio-female" : "radio-in"}
            onClick={() => ctx.handleFemale()}
            style={
              ctx.state.radTErr
                ? { border: "1px solid red" }
                : { borderWidth: 0 }
            }
          >
            <img
              src={female}
              style={{
                width: 50,
                height: 50,
                marginBottom: 5,
              }}
            />
            Female
          </div>
        </div>

        <div
          class="a-upper-input"
          style={ctx.state.employee ? {} : { marginTop: 20 }}
        >
          <div
            style={ctx.state.employee ? { display: "none" } : {}}
            className="a-input-field"
          >
            <label className="input-label">
              Business Name
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
            </label>
            <div
              className="div-input-icon"
              style={
                ctx.state.companyTErr
                  ? { border: "1px solid red" }
                  : !(!company || !companyError)
                  ? { border: "1px solid red" }
                  : { borderWidth: 0 }
              }
            >
              <MdOutlineBusinessCenter
                color="#3D459D"
                size={21}
                className="svg-u"
                style={{
                  position: "relative",
                  top: 13,
                  left: 10,
                }}
              />
              <input
                placeholder="Work Hall"
                id="company"
                name="company"
                onChange={(name) => {
                  ctx._handleChange(
                    companyCheck,
                    "companyValid",
                    "company",
                    name.target.value
                  );
                }}
                type="text"
                // placeholder="We need your full name"
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
          <div className="a-input-field">
            <label className="input-label">
              Name
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
            </label>
            <div
              className="div-input-icon"
              style={
                ctx.state.nameTErr
                  ? { border: "1px solid red" }
                  : !(!name || !nameError)
                  ? { border: "1px solid red" }
                  : { borderWidth: 0 }
              }
            >
              <FaRegUser
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
                placeholder="Ahmed Mehanti"
                id="name"
                name="name"
                onChange={(name) => {
                  ctx._handleChange(
                    nameCheck,
                    "nameValid",
                    "name",
                    name.target.value
                  );
                }}
                type="text"
                // placeholder="We need your full name"
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

          <div className="div-input-inner">
            <div className="a-input-field a-input-field-ph ">
              <label className="input-label">
                Number
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  *
                </span>
              </label>
              <div
                className="div-input-icon"
                style={
                  ctx.state.phoneTErr
                    ? { border: "1px solid red" }
                    : !(!phone || !phoneError)
                    ? { border: "1px solid red" }
                    : { borderWidth: 0 }
                }
              >
                <FiSmartphone
                  color="#3D459D"
                  size={20}
                  className="svg-p"
                  style={{
                    position: "relative",
                    top: 12,
                    left: 10,
                  }}
                />
                <input
                  id="phone"
                  name="phone"
                  placeholder="03001234567"
                  onChange={(phone) => {
                    ctx._handleChange(
                      phoneCheck,
                      "phoneValid",
                      "phone",
                      phone.target.value
                    );
                  }}
                  type="text"
                  style={{
                    fontFamily: "Lato",
                    fontSize: 17,
                    color: "#868686",
                  }}
                  className="a-r-input-box"
                  value={ctx.state.phone}
                />
              </div>
            </div>
          </div>
          <div className="a-input-field">
            <label
              className="input-label"
              style={{ fontSize: 22, marginTop: -11 }}
            >
              Job title
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
            </label>
            <a
              // className="change-a"
              onClick={
                ctx.state.csr
                  ? () => {}
                  : ctx.state.sw
                  ? () => {}
                  : () => {
                      ctx.handleNoCategory(fullpageApi);
                    }
              }
            >
              <div
                className="div-input-icon"
                style={
                  ctx.state.jobErr
                    ? { border: "1px solid red" }
                    : { borderWidth: 0 }
                }
              >
                <MdWorkOutline
                  color="#3D459D"
                  size={22}
                  className="svg-j"
                  style={{
                    position: "relative",
                    left: 10,
                  }}
                />
                <Select
                  options={job_options}
                  isDisabled={ctx.state.sw ? false : true}
                  onChange={(e) => ctx.selectChange(e.value)}
                  id="select"
                  placeholder={
                    ctx.state.sw
                      ? "select job title"
                      : "first select job category above"
                  }
                />
              </div>
            </a>
            {/* {this.state.jobErr && (
              <p className="a-error-message a-error-message-j">
                Select job category first.
              </p>
            )} */}
          </div>
          <div className="div-btn-2">
            <button
              type="button"
              class="a-reg-btn"
              onClick={() => fullpageApi.moveTo(2, 0)}
            >
              Back
            </button>
            <button
              type="button"
              class="a-reg-btn"
              onClick={() => ctx.handleNext1(fullpageApi)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}
