import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import NumberFormat from "react-number-format";
import CurrencyFormat from "react-currency-format";
import { MdCancel, MdOutlineSpeakerNotes } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";
import {
  emailCheck,
  nameCheck,
  phoneCheck,
  cityCheck,
  companyCheck,
  JobDescCheck,
} from "../validation";
import { Saltimings } from "../usefullArrays/salaryTiming";
import {
  handleSalaryChange,
  _handleChange,
  onSelectSalary,
} from "../functions/homeFunctions";
import {
  back1,
  handleAchievementAdd,
  handleChange,
} from "../functions/homeFunctions";
import { handleNext3 } from "../backend/sheet_db_backend";

export default class Form1 extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }
  render() {
    const ctx = this.props.ctx;
    const fullpageApi = this.props.fullpageApi;
    const selectedSalary = this.props.selectedSalary;
    const selectedCategories = this.props.selectedCategories;

    let { selectedSal } = ctx.state;
    let n_val = ctx.state.range_cond;
    let step_val = 10000;
    if (n_val <= 100000) {
      step_val = 10000;
    } else if (n_val >= 100000 && n_val <= 310000) {
      step_val = 20000;
    } else {
      step_val = 40000;
    }
    let v1 = ctx.state.value.split("-");
    // console.log(ctx.achievement);
    return (
      <div className="salary-div">
        {ctx.state.employee ? (
          <h1>Let's build your CV!</h1>
        ) : (
          <h1>Let’s create your job post!</h1>
        )}

        <div
          className="a-input-field-nxt a-input-field-nxt1 nxt2"
          style={ctx.state.employee ? { display: "none" } : {}}
        >
          <label className="input-label lbl2">
            Job Description
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
            className="div-input-jbdesc"
            style={
              ctx.state.jobDescTErr
                ? { border: "1px solid red" }
                : { borderWidth: 0 }
            }
          >
            <MdOutlineSpeakerNotes
              color="#3D459D"
              size={22}
              style={{
                position: "relative",
                top: 10,
                left: 10,
              }}
            />
            <textarea
              placeholder="Job description"
              id="jobDesc"
              name="jobDesc"
              onChange={
                // (e) => console.log(e.target.value.length)
                (name) => {
                  _handleChange(
                    JobDescCheck,
                    "jobDescValid",
                    "jobDesc",
                    name.target.value,
                    ctx
                  );
                }
              }
              type="text"
              maxLength={300}
              // placeholder="We need your full name"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              // value={this.state.name}
              className="a-r-input-box a-r-jb-desc"
            />
            <p className="p-achievement-length">
              {ctx.state.achievementLen}/300
            </p>
          </div>
        </div>
        <div
          className="a-input-field-nxt a-input-field-nxt1 nxt2"
          style={ctx.state.employer ? { display: "none" } : {}}
        >
          <label className="input-label lbl2">
            Your Biggest Achievement
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
            className="div-input-icon div-skills-inp"
            style={
              ctx.state.achievementTErr
                ? { border: "1px solid red" }
                : { borderWidth: 0 }
            }
          >
            <GiAchievement
              color="#3D459D"
              size={22}
              className="svg-m"
              style={{
                position: "relative",
                top: 14,
                left: 10,
              }}
            />

            <textarea
              placeholder="Enter any of your achievement"
              id="name"
              name="name"
              onChange={
                // (e) => console.log(e.target.value.length)
                (e) => {
                  handleAchievementAdd(e.target.value, ctx);
                  this.setState({ show: false });
                }
              }
              type="text"
              maxLength={300}
              // placeholder="We need your full name"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
                resize: "none",
                width: "90%",
                height: "100%",
              }}
              // value={this.state.name}
              className="skill-set a-r-input-box "
            />
            <p className="p-achievement-length">
              {ctx.state.achievementLen}/300
            </p>
          </div>
        </div>
        <div
          className="salary-div-time"
          style={ctx.state.employee ? { display: "none" } : {}}
        >
          {" "}
          <label className="input-label">
            Salary
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              *
            </span>{" "}
          </label>
          <div className="div-cb-salary">
            {Saltimings.map((v, i) => (
              <button
                className={
                  selectedSal.includes(i) ? "tickContainer" : "timeBtn"
                }
                style={
                  ctx.state.stTErr
                    ? { border: "0.3px solid red" }
                    : { borderWidth: 0 }
                }
                onClick={() => onSelectSalary(i, ctx)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div
          className="current-salary-main-div"
          style={ctx.state.employer ? { display: "none" } : {}}
        >
          <label className="input-label">
            Current Salary
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              *
            </span>{" "}
          </label>
          <div className="div-range">
            <div class="slidecontainer">
              <div
                className="div-value"
                style={{ left: ctx.state.value_px + "%" }}
              ></div>

              <Slider
                min={10000}
                max={ctx.state.sw ? 530000 : 90000}
                defaultValue={60000}
                trackStyle={
                  ctx.state.value === "0"
                    ? { backgroundColor: "transparent" }
                    : { backgroundColor: "#f0bd3a" }
                }
                step={step_val}
                onChange={(e) => handleChange(e, ctx)}
              />
            </div>
            <h3
              style={
                ctx.state.valTErr
                  ? {
                      border: "0.3px solid red",
                      fontSize: 20,
                    }
                  : {
                      borderWidth: 0,
                      fontSize: 20,
                    }
              }
            >
              <NumberFormat
                thousandsGroupStyle="thousand"
                value={
                  ctx.state.sw
                    ? n_val === 530000
                      ? "500000+"
                      : n_val === 0
                      ? "0"
                      : `${v1[0]} -- ${v1[1]}`
                    : n_val === 90000
                    ? "80000+"
                    : n_val === 0
                    ? "0"
                    : `${v1[0]} -- ${v1[1]}`
                }
                prefix="Rs "
                decimalSeparator="--"
                displayType="text"
                type="text"
                thousandSeparator={true}
                allowNegative={false}
                isNumericString={true}
              />
            </h3>
          </div>
        </div>
        <div
          className="current-salary-main-div"
          style={ctx.state.employee ? { display: "none" } : {}}
        >
          <label className="input-label">
            Expected Salary
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              *
            </span>{" "}
          </label>
          <div className="expected-salary-input">
            <CurrencyFormat
              value={ctx.state.from}
              placeholder="Rs"
              displayType={"input"}
              onChange={(e) => handleSalaryChange("from", e.target.value, ctx)}
              thousandSeparator={true}
              prefix={"Rs "}
              style={
                ctx.state.expSalTErr
                  ? {
                      border: "1px solid red",
                      borderRadius: 16,
                    }
                  : { borderWidth: 0 }
              }
            />
            &nbsp; {selectedSalary[0] != "Fixed" ? <p> to </p> : ""} &nbsp;
            <CurrencyFormat
              value={ctx.state.to}
              placeholder="Rs"
              displayType={"input"}
              onChange={(e) => handleSalaryChange("to", e.target.value, ctx)}
              thousandSeparator={true}
              prefix={"Rs "}
              style={
                selectedSalary[0] === "Fixed"
                  ? { display: "none" }
                  : ctx.state.expSalTErr
                  ? {
                      border: "1px solid red",
                      borderRadius: 16,
                    }
                  : { borderWidth: 0 }
              }
            />
            <p className="p-select-sal">{selectedSalary}</p>
          </div>
        </div>
        <div className="exp-btn1 sal-btn">
          <button
            type="button"
            class="a-reg-btn"
            onClick={() => back1(fullpageApi)}
          >
            Back
          </button>
          <button
            type="button"
            class={"a-reg-btn"}
            onClick={() =>
              handleNext3(fullpageApi, selectedCategories, selectedSalary, ctx)
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
