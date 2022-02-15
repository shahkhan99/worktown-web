import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import NumberFormat from "react-number-format";
import CurrencyFormat from "react-currency-format";
import { MdCancel } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";

export default class Form1 extends Component {
  render() {
    const ctx = this.props.ctx;
    const fullpageApi = this.props.fullpageApi;
    const data = this.props.data;
    const selectedSalary = this.props.selectedSalary;
    const selectedCategories = this.props.selectedCategories;
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
    return (
      <div className="salary-div">
        <div
          className="a-input-field-nxt a-input-field-nxt1 nxt2"
          style={ctx.state.employer ? { display: "none" } : {}}
        >
          <label className="input-label">
            Your biggest Achievement
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
            <input
              className=" skill-set a-r-input-box"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  ctx.handleAchievementAdd(e.target.value);
                  e.target.value = "";
                }
              }}
              maxLength={280}
              placeholder=" + Add Achievement"
            />
            <div className="defSkill-main">
              {ctx.state.achievement.map((v) => (
                <div className="defAch-map">
                  {v}
                  <MdCancel
                    color="#2e2f40"
                    size={20}
                    // className="svg-m"
                    style={{
                      position: "relative",
                      top: 0,
                      left: 10,
                      marginRight: 5,
                      cursor: "pointer",
                      width: 50,
                    }}
                    onClick={() => ctx.setState({ achievement: [] })}
                  />
                </div>
              ))}
            </div>
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
                onClick={() => ctx.onSelectSalary(i, selectedSalary)}
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
                onChange={(e) => ctx.handleChange(e)}
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
              onChange={(e) => ctx.handleSalaryChange("from", e.target.value)}
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
            &nbsp; {selectedSalary[0] != "Fixed" ? "to" : ""} &nbsp;
            <CurrencyFormat
              value={ctx.state.to}
              placeholder="Rs"
              displayType={"input"}
              onChange={(e) => ctx.handleSalaryChange("to", e.target.value)}
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
        <div className="exp-btn1">
          <button
            type="button"
            class="a-reg-btn"
            onClick={() => ctx.back1(fullpageApi)}
          >
            Back
          </button>
          <button
            type="button"
            class={"a-reg-btn"}
            onClick={() =>
              ctx.handleNext3(fullpageApi, selectedCategories, selectedSalary)
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
