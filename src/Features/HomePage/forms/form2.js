import React, { Component } from "react";
import {
  emailCheck,
  nameCheck,
  phoneCheck,
  cityCheck,
  companyCheck,
} from "../validation";
import male from "../../../assets/icons/male-student.png";
import female from "../../../assets/icons/woman.png";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

import { FiSmartphone } from "react-icons/fi";

export default class Form3 extends Component {
  render() {
    const ctx = this.props.ctx;
    const fullpageApi = this.props.fullpageApi;
    const data = this.props.data;
    // console.log(ctx);

    let { company, name, email, phone } = ctx.state;
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
            onClick={
              ctx.state.redux_data === null ? () => ctx.handleMale() : ""
            }
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
            disabled={ctx.state.redux_data !== null && true}
            className={ctx.state.female ? "radio-female" : "radio-in"}
            onClick={
              ctx.state.redux_data === null ? () => ctx.handleFemale() : ""
            }
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
                disabled={ctx.state.redux_data !== null && true}
                // placeholder="We need your full name"
                style={{
                  fontFamily: "Lato",
                  fontSize: 17,
                  color: "#868686",
                }}
                value={
                  ctx.state.redux_data !== null
                    ? ctx.state.redux_data.BusinessName
                      ? ctx.state.redux_data.BusinessName
                      : ctx.state.name
                    : ctx.state.company
                }
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
                disabled={ctx.state.redux_data !== null && true}
                // placeholder="We need your full name"
                style={{
                  fontFamily: "Lato",
                  fontSize: 17,
                  color: "#868686",
                }}
                value={
                  ctx.state.redux_data !== null
                    ? ctx.state.redux_data.Name
                    : null
                }
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
                  disabled={ctx.state.redux_data !== null && true}
                  type="text"
                  style={{
                    fontFamily: "Lato",
                    fontSize: 17,
                    color: "#868686",
                  }}
                  className="a-r-input-box"
                  value={
                    ctx.state.redux_data !== null
                      ? ctx.state.redux_data.Phone
                      : ctx.state.phone
                  }
                />
              </div>
            </div>
          </div>
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
            <div
              className="div-input-icon"
              style={
                ctx.state.emailTErr
                  ? { border: "1px solid red" }
                  : !(!email || !emailError)
                  ? { border: "1px solid red" }
                  : { borderWidth: 0 }
              }
            >
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
                placeholder="abc@gmail.com"
                id="email"
                name="email"
                value={
                  ctx.state.redux_data !== null
                    ? ctx.state.redux_data.Email
                    : null
                }
                onChange={(email) => {
                  ctx._handleChange(
                    emailCheck,
                    "emailValid",
                    "email",
                    email.target.value
                  );
                }}
                type="email"
                disabled={ctx.state.redux_data !== null && true}
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
