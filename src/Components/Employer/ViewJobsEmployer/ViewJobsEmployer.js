import React, { useState, useEffect, ReactFragment } from "react";
import "./ViewJobsEmployer.css";
import Select from "react-select";
import Loader from "../Loader/loader";
import { ImLocation, ImCross } from "react-icons/im";
import { GrTechnology } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { getJobsToView, SaveUpdatedJob, deleteJob } from "./backend";
import MultipleSelectCheckmarks from "./component/muiMultiSelect";

function ViewJobsEmployer() {
  const [data, setData] = useState("");
  const [editingState, setEditingState] = useState("");
  const [editingdata, setEditingData] = useState("");
  const [edit, setEdit] = useState(false);
  const [allJobs, setAllJobs] = useState("");
  const [strArr1, setstrArr1] = useState("");
  const [strArr2, setstrArr2] = useState("");

  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getJobsToView(redux_data.jobs, setAllJobs);
    setData(redux_data);
  }, [editingdata, redux_data]);

  console.log("current =>", allJobs);
  const getMuiTimings = (e) => {
    // console.log(data);
    setEditingData({
      ...editingdata,
      InterestedIn: e.toString(),
    });
  };
  const handleSave = async (i) => {
    let {
      City,
      Education,
      EnglishLevel,
      Experience,
      InterestedIn,
      JobCategory,
      JobDescription,
      JobTime,
      JobType,
      Skills,
    } = editingdata;
    let exp_sal = "Rs " + strArr1 + "-" + "Rs " + strArr2;
    console.log(strArr1, strArr2);

    setEditingState("");
    if (JobTime == "Fixed") {
      if (
        City === "" ||
        Education === "" ||
        EnglishLevel === "" ||
        Experience === "" ||
        InterestedIn === "" ||
        JobCategory === "" ||
        JobDescription === "" ||
        JobTime === "" ||
        JobType === "" ||
        strArr1 === "" ||
        strArr1 === NaN ||
        Skills === ""
      ) {
        alert("All fields are mandatory");
      } else {
        await SaveUpdatedJob(
          editingdata,
          redux_data,
          exp_sal,
          setEditingData,
          setAllJobs,
          allJobs,
          i
        );
        setTimeout(() => {
          setstrArr1("");
          setstrArr2("");
        }, 500);
      }
    } else if (
      City === "" ||
      Education === "" ||
      EnglishLevel === "" ||
      Experience === "" ||
      InterestedIn === "" ||
      JobCategory === "" ||
      JobDescription === "" ||
      JobTime === "" ||
      JobType === "" ||
      strArr1 === "" ||
      strArr2 === NaN ||
      strArr1 === NaN ||
      strArr2 === "" ||
      Skills === ""
    ) {
      alert("All fields are mandatory");
    } else {
      await SaveUpdatedJob(
        editingdata,
        redux_data,
        exp_sal,
        setEditingData,
        setAllJobs,
        allJobs,
        i
      );
      setTimeout(() => {
        setstrArr1("");
        setstrArr2("");
      }, 500);
    }
  };
  const handleDelete = (i) => {
    deleteJob(editingdata, redux_data, setAllJobs, allJobs, i);
  };

  // console.log(allJobs);
  const handleEdit = async (e, i) => {
    // console.log(i);
    // console.log(data.jobs);
    setEditingState(e.key);
    setEditingData(data.jobs[e.key]);
    // setEdit(true);
    await setTimeout(async () => {
      // console.log(editingdata);
      let str = await data.jobs[e.key].ExpectedSalary.split("-");
      let Arr1 = str[0].split(" ");
      let Arr2 = str[1].split(" ");
      await setstrArr1(parseInt(Arr1[1]));
      await setstrArr2(parseInt(Arr2[1]));
      // parseInt(strArr1[1]);
      // let res = editingdata.ExpectedSalary.replace(/[^\d.]/g, "");
    }, 500);
  };
  // console.log(editingdata);

  return (
    <div className="shortlisting-main-upper">
      <div className="shrt-head-div">
        <h4>Your Job Posts</h4>
      </div>
      <div className="shortlisted-main">
        <div className="shrt-cont-div shrt-cont-div-view-jb">
          <div style={{ width: "100%" }}>
            <div className="shortlisted-ind-header">
              <div className="shortlisted-ind-header-heading">
                <div className="shortlisted-ind-header-heading-1">
                  <GrTechnology
                    color="#2C72E5"
                    size={20}
                    style={{ marginRight: 15 }}
                  />
                  <h4>Software & IT</h4>
                </div>
              </div>
            </div>
            <div className="div-cand-card-main">
              <div className="div-cand-card-main-sub div-cand-card-main-sub-view-jobs">
                {allJobs === undefined ? (
                  <div className="int-overflow-h3">
                    <h3 className="int-overflow-h3-">
                      You haven't posted any job
                    </h3>
                  </div>
                ) : allJobs.length ? (
                  allJobs.map((v, i) => {
                    var expSalFixed = v.ExpectedSalary.split("-");
                    // console.log(expSalFixed[0]);
                    // var timeArr = v.InterestedIn.split(",");
                    var sklArr = v.Skills.split(",");
                    return (
                      <div
                        className="div-cand-card div-cand-card-view-jobs"
                        style={v.key === editingState ? { height: 610 } : {}}
                      >
                        {/* {console.log(nameArr[1] && nameArr[1][0])} */}
                        <div className="div-cand-card-header-loc-exp-main div-js-card-header-loc-exp-main">
                          <div className="div-jv-card-btn">
                            <button
                              style={
                                v.key === editingState
                                  ? { display: "none" }
                                  : { display: "flex" }
                              }
                              onClick={() => handleEdit(v, i)}
                            >
                              Edit
                            </button>
                            <button
                              style={
                                v.key === editingState
                                  ? { display: "flex" }
                                  : { display: "none" }
                              }
                              onClick={() => handleSave(i)}
                            >
                              Save
                            </button>
                            <button
                              style={
                                v.key === editingState
                                  ? { display: "flex" }
                                  : { display: "none" }
                              }
                              onClick={() => handleDelete(i)}
                              className="div-jd-card-btn-int-rej"
                            >
                              Delete
                            </button>
                          </div>
                          <div className="div_title_loc_main">
                            <h3 style={{ fontSize: 20 }}>{v.JobType} </h3>
                            <div className="div-cand-card-header-loc-exp div-js-card-header-loc-exp">
                              <p>
                                <ImLocation
                                  color="#3e469d"
                                  size={13}
                                  style={{ marginRight: 5, marginLeft: -1.25 }}
                                />
                                {v.City}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="div-jv-basic-main-main-div">
                          <div className="div-jv-basic-main-div1">
                            <div className="div-jv-basic-jd">
                              <p
                                style={
                                  v.key === editingState
                                    ? { display: "none" }
                                    : { display: "flex" }
                                }
                              >
                                {v.JobDescription}
                              </p>
                              <div
                                className="div-input-icon-emp-dash-edit-job1"
                                style={
                                  v.key === editingState
                                    ? { display: "flex" }
                                    : { display: "none" }
                                }
                              >
                                <textarea
                                  id="name"
                                  name="name"
                                  onChange={(name) => {
                                    setEditingData({
                                      ...editingdata,
                                      JobDescription: name.target.value,
                                    });
                                  }}
                                  type="text"
                                  style={{
                                    fontFamily: "Lato",
                                  }}
                                  multiple
                                  className=""
                                  value={editingdata.JobDescription}
                                />
                              </div>
                            </div>
                            <div
                              className="div-jv-basic-jt-sal-main"
                              style={
                                v.key === editingState
                                  ? { flexDirection: "column", height: 155 }
                                  : {}
                              }
                            >
                              <div className="div-jv-basic-jt">
                                <label
                                  className={
                                    v.key === editingState
                                      ? "label-on-edit-jv-emp"
                                      : ""
                                  }
                                >
                                  Job timings
                                </label>
                                <p
                                  style={
                                    v.key === editingState
                                      ? { display: "none" }
                                      : { display: "flex" }
                                  }
                                >
                                  {v.InterestedIn}
                                </p>
                                <div
                                  className="select-div-job-view-edit"
                                  style={
                                    v.key === editingState
                                      ? { display: "flex" }
                                      : { display: "none" }
                                  }
                                >
                                  <MultipleSelectCheckmarks
                                    editingdata={editingdata}
                                    getMuiTimings={getMuiTimings}
                                  />
                                </div>
                              </div>
                              <div
                                className={
                                  v.key === editingState
                                    ? "div-jv-basic-exps pos-bot-jv-emp"
                                    : "div-jv-basic-exps"
                                }
                              >
                                <label
                                  className={
                                    v.key === editingState
                                      ? "label-on-edit-jv-emp"
                                      : ""
                                  }
                                >
                                  Salary
                                </label>
                                <p
                                  style={
                                    v.key === editingState
                                      ? { display: "none" }
                                      : { display: "flex" }
                                  }
                                >
                                  {v.JobTime === "Fixed"
                                    ? expSalFixed[0]
                                    : v.ExpectedSalary}{" "}
                                  &nbsp;{" "}
                                  <span className="span_sal_exp">
                                    {" "}
                                    / &nbsp; {v.JobTime}{" "}
                                  </span>
                                </p>
                                <div
                                  style={
                                    v.key === editingState
                                      ? { display: "flex" }
                                      : { display: "none" }
                                  }
                                  className="div_jv_sal_inner_100"
                                >
                                  <div
                                    className="div-input-icon-emp-dash-edit-job"
                                    style={
                                      v.key === editingState
                                        ? { display: "flex" }
                                        : { display: "none" }
                                    }
                                  >
                                    <input
                                      id="name"
                                      name="name"
                                      onChange={(e) =>
                                        setstrArr1(e.target.value)
                                      }
                                      type="number"
                                      style={{
                                        fontFamily: "Lato",
                                      }}
                                      multiple
                                      className=""
                                      value={strArr1}
                                    />{" "}
                                  </div>
                                  <p
                                    style={
                                      v.key === editingState
                                        ? editingdata.JobTime === "Fixed"
                                          ? {
                                              display: "none",
                                            }
                                          : {
                                              fontSize: 20,
                                              width: "auto",
                                              alignSelf: "center",
                                              fontWeight: "bold",
                                              padding: "0px 3px",
                                            }
                                        : { display: "none" }
                                    }
                                  >
                                    -
                                  </p>
                                  <div
                                    className="div-input-icon-emp-dash-edit-job"
                                    style={
                                      v.key === editingState
                                        ? editingdata.JobTime === "Fixed"
                                          ? {
                                              display: "none",
                                            }
                                          : {
                                              display: "flex",
                                            }
                                        : { display: "none" }
                                    }
                                  >
                                    <input
                                      id="name"
                                      name="name"
                                      onChange={(e) =>
                                        setstrArr2(e.target.value)
                                      }
                                      type="number"
                                      style={{
                                        fontFamily: "Lato",
                                      }}
                                      multiple
                                      className=""
                                      value={strArr2}
                                    />{" "}
                                  </div>
                                  <span
                                    style={
                                      v.key === editingState
                                        ? {
                                            display: "flex",
                                            alignItems: "center",
                                          }
                                        : { display: "none" }
                                    }
                                  >
                                    &nbsp; / &nbsp;{" "}
                                    <div
                                      className="select-div-job-view-edit select-div-job-view-edit-span"
                                      style={
                                        v.key === editingState
                                          ? { display: "flex" }
                                          : { display: "none" }
                                      }
                                    >
                                      <select
                                        onChange={(e) =>
                                          setEditingData({
                                            ...editingdata,
                                            JobTime: e.target.value,
                                          })
                                        }
                                        value={editingdata.JobTime}
                                        // className={this.sta}
                                        placeholder="Salary"
                                        required
                                      >
                                        <option>Hourly</option>
                                        <option>Monthly</option>
                                        <option>Fixed</option>
                                      </select>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="div-jv-basic-main-div2">
                            <div className="div-jv-basic-skl">
                              <label>Skills</label>
                              <div className="div-cand-card-inner-short-jv">
                                {sklArr.map((skl) => (
                                  <p>{skl}</p>
                                ))}
                              </div>
                            </div>
                            <div
                              className="div-jv-basic-exp-edu-eng-main"
                              style={
                                v.key === editingState
                                  ? {
                                      flexWrap: "wrap",
                                      height: 220,
                                      alignItems: "center",
                                    }
                                  : {}
                              }
                            >
                              <div
                                className="div-jv-basic-exp"
                                style={
                                  v.key === editingState
                                    ? { width: "100%" }
                                    : {}
                                }
                              >
                                <label>Experience</label>
                                <p>{v.Experience}</p>
                              </div>

                              <div
                                className={
                                  v.key === editingState
                                    ? "div-jv-basic-edu pos-bot-jv-emp"
                                    : "div-jv-basic-edu"
                                }
                                style={
                                  v.key === editingState ? { width: "50%" } : {}
                                }
                              >
                                <label
                                  className={
                                    v.key === editingState
                                      ? "label-on-edit-jv-emp"
                                      : ""
                                  }
                                >
                                  Education
                                </label>
                                <p
                                  style={
                                    v.key === editingState
                                      ? { display: "none" }
                                      : { display: "flex" }
                                  }
                                >
                                  {v.Education}
                                </p>
                                <div
                                  className="select-div-job-view-edit select-div-job-view-edit-eng-edu"
                                  style={
                                    v.key === editingState
                                      ? { display: "flex", width: 210 }
                                      : { display: "none" }
                                  }
                                >
                                  <select
                                    onChange={(e) =>
                                      setEditingData({
                                        ...editingdata,
                                        Education: e.target.value,
                                      })
                                    }
                                    value={editingdata.Education}
                                    // className={this.sta}
                                    placeholder="Education"
                                    required
                                  >
                                    <option>Below 10th</option>
                                    <option>Matric (10th)</option>
                                    <option>Inter</option>
                                    <option>Diploma</option>
                                    <option>Graduate</option>
                                    <option>Post Graduate</option>
                                  </select>
                                </div>
                              </div>
                              <div
                                className={
                                  v.key === editingState
                                    ? "div-jv-basic-eng pos-bot-jv-emp"
                                    : "div-jv-basic-eng"
                                }
                                style={
                                  v.key === editingState ? { width: "50%" } : {}
                                }
                              >
                                <label
                                  className={
                                    v.key === editingState
                                      ? "label-on-edit-jv-emp"
                                      : ""
                                  }
                                >
                                  English Level
                                </label>
                                <p
                                  style={
                                    v.key === editingState
                                      ? { display: "none" }
                                      : { display: "flex" }
                                  }
                                >
                                  {v.EnglishLevel}
                                </p>
                                <div
                                  className="select-div-job-view-edit select-div-job-view-edit-eng-edu"
                                  style={
                                    v.key === editingState
                                      ? { display: "flex", width: 210 }
                                      : { display: "none" }
                                  }
                                >
                                  <select
                                    onChange={(e) =>
                                      setEditingData({
                                        ...editingdata,
                                        EnglishLevel: e.target.value,
                                      })
                                    }
                                    value={editingdata.EnglishLevel}
                                    // className={this.sta}
                                    placeholder="Eng Lvl"
                                    required
                                  >
                                    <option>English-Urdu mix</option>
                                    <option>Basic</option>
                                    <option>Advance</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="div-exp-sal-view-jobs-employer">
                          <BsCash
                            color="#000"
                            size={22}
                            style={{ marginRight: 5 }}
                          />
                          <p>{v.ExpectedSalary}</p>&nbsp;/&nbsp;{" "}
                          <p>{v.JobTime}</p>
                        </div> */}
                      </div>
                    );
                  })
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewJobsEmployer;
