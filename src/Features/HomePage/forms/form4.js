import React, { Component } from "react";
import { BsBookmarkStar } from "react-icons/bs";
import TagsInput from "react-tagsinput";
import { timings } from ".././usefullArrays/salaryTiming";

export default class Form4 extends Component {
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
    // console.log(ctx);
    let { selected, defSkills, defSkillsDM, defSkillsGD } = ctx.state;
    return (
      <div className="last-int">
        {ctx.state.employee ? (
          <h1>Let's build your CV!</h1>
        ) : (
          <h1>Let’s create your job post!</h1>
        )}
        <div className="a-input-field-nxt a-input-field-nxt1">
          <label className="input-label lbl2">
            Skills
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
              ctx.state.skillTErr
                ? { border: "1px solid red" }
                : { borderWidth: 0 }
            }
          >
            <BsBookmarkStar
              color="#3D459D"
              size={20}
              className="svg-m"
              style={{
                position: "relative",
                top: 14,
                left: 10,
              }}
            />
            <TagsInput
              className=" skill-set"
              value={ctx.state.skillTag}
              onChange={(e) => {
                ctx.handleSkillAdd(e);
              }}
              maxTags={5}
              inputProps={{
                placeholder: " + Add another skill",
              }}
            />

            <div className="defSkill-main">
              {defSkills.map((v) => (
                <div
                  className={
                    ctx.state.skills.includes(v)
                      ? "defSkill-map-selected"
                      : "defSkill-map"
                  }
                  onClick={() => {
                    ctx.handleSkillDefault(v);
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        <label className="input-label  lbl1">
          Job Timings
          <span
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            *
          </span>{" "}
        </label>
        <div className="div-cb">
          {timings.map((v, i) => (
            <button
              className={selected.includes(i) ? "tickContainer " : "timeBtn"}
              style={
                ctx.state.intTErr
                  ? { border: "0.3px solid red" }
                  : { borderWidth: 0 }
              }
              key={i}
              onClick={(e) => ctx.onSelect(i, e)}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="exp-btn1 jb-btn">
          <button
            type="button"
            class="a-reg-btn"
            onClick={() => ctx.back2(fullpageApi)}
          >
            Back
          </button>
          <button
            type="button"
            class={"a-reg-btn"}
            onClick={() =>
              ctx.handleNext4(fullpageApi, selectedCategories, selectedSalary)
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
