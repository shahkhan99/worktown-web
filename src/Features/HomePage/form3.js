import React, { Component } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { BiStar } from "react-icons/bi";
import { FiBookOpen } from "react-icons/fi";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import {
  emailCheck,
  nameCheck,
  phoneCheck,
  cityCheck,
  companyCheck,
} from "./validation";
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
      <div className={ctx.state.part2 ? "work-exp" : "work-exp_off"}>
        {ctx.state.employee ? (
          <h1>Let's build your CV!</h1>
        ) : (
          <h1>Let’s create your job post!</h1>
        )}

        <div className="a-input-field-nxt">
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
              // value={this.state.email}
              onChange={(email) => {
                ctx._handleChange(
                  emailCheck,
                  "emailValid",
                  "email",
                  email.target.value
                );
              }}
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
        <div className="a-input-field-nxt">
          <label className="input-label" style={{ paddingLeft: 5 }}>
            City
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
              ctx.state.cityTErr
                ? { border: "1px solid red" }
                : !(!city || !occError)
                ? { border: "1px solid red" }
                : { borderWidth: 0 }
            }
          >
            <MdOutlineLocationOn
              color="#3D459D"
              size={20}
              className="svg-l"
              style={{
                position: "relative",
                top: 14,
                left: 10,
              }}
            />
            <input
              placeholder="Karachi"
              value="Karachi"
              disabled
              id="city"
              name="city"
              onChange={(city) => {
                ctx._handleChange(
                  cityCheck,
                  "cityValid",
                  "city",
                  city.target.value
                );
              }}
              type="text"
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

        <label
          className="input-label input-label1 label2"
          style={{ paddingLeft: 5 }}
        >
          Details
          <span
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            *
          </span>
        </label>
        <div className="div-check">
          <div
            className="select-div"
            style={
              ctx.state.expTErr
                ? { border: "1px solid red" }
                : { borderWidth: 0 }
            }
          >
            <BiStar
              color="#3D459D"
              size={20}
              style={{
                position: "relative",
                top: 7,
                left: 8,
              }}
            />
            <select
              onChange={(e) => ctx.handleSelect("experience", e)}
              value={ctx.state.experience}
              // className={this.sta}
              placeholder="Work Exp"
              required
            >
              <option value="" selected>
                Work Experience
              </option>
              <option>Fresher</option>
              <option>0-1 years</option>
              <option>2 years</option>
              <option>3-5 years</option>
              <option>5-10 years</option>
              <option>10+ years</option>
            </select>
          </div>{" "}
          <div
            className="select-div"
            style={
              ctx.state.eduTErr
                ? { border: "1px solid red" }
                : { borderWidth: 0 }
            }
          >
            <FiBookOpen
              color="#3D459D"
              size={20}
              style={{
                position: "relative",
                top: 7,
                left: 8,
              }}
            />
            <select
              onChange={(e) => ctx.handleSelect("education", e)}
              value={ctx.state.education}
              required
            >
              <option value="" selected>
                Education
              </option>
              <option>Below 10th</option>
              <option>Matric (10th)</option>
              <option>Inter</option>
              <option>Diploma</option>
              <option>Graduate</option>
              <option>Post Graduate</option>
            </select>
          </div>{" "}
          <div
            className="select-div"
            style={
              ctx.state.engTErr
                ? { border: "1px solid red" }
                : { borderWidth: 0 }
            }
          >
            <TiSortAlphabeticallyOutline
              color="#3D459D"
              size={22}
              style={{
                position: "relative",
                top: 6,
                left: 8,
              }}
            />
            <select
              onChange={(e) => ctx.handleSelect("eng_lvl", e)}
              value={ctx.state.eng_lvl}
              required
            >
              <option value="" selected>
                English Level
              </option>
              <option>English-Urdu mix</option>
              <option>Basic</option>
              <option>Advance</option>
            </select>
          </div>
        </div>

        <div className="exp-btn">
          <button
            type="button"
            class="a-reg-btn"
            onClick={() => ctx.back(fullpageApi)}
          >
            Back
          </button>
          <button
            type="button"
            class={"a-reg-btn"}
            onClick={() => ctx.handleNext2(fullpageApi)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
