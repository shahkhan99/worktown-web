import React, { useState, useEffect, ReactFragment } from "react";
import "./EditProfessionalDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { SaveUpdatedData } from "./backend";
import { set_current_user_data } from "../../../store/action/index";
import MultipleSelectCheckmarks from "./components/muiSelect/muiSelect";
import Select from "react-select";
import CreatableMulti from "./components/creatableSelect/creatableSelect";
import { job_options } from "./jobOption";
import { salary_options } from "./salaryOption";
import { MdLocationOn } from "react-icons/md";
import { BsEnvelope, BsFillTelephoneFill } from "react-icons/bs";
function EditProfessionalDetails() {
  const dispatch = useDispatch();

  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );
  const [data, setData] = useState("");
  const [prevEmp, setPrevEmp] = useState("");
  const [edit, setEdit] = useState("");
  const [moreEdit, setMoreEdit] = useState("");

  useEffect(() => {
    setData(redux_data);
  }, [redux_data]);

  // console.log(prevEmp);
  const getMuiTimings = (e) => {
    // console.log(e);
    setData({
      ...data,
      InterestedIn: e.toString(),
    });
  };
  const getMultiMuiTimings = (e) => {
    // console.log(e);
    setData({
      ...data,
      Skills: e.toString(),
    });
  };
  const handleSave = async () => {
    await SaveUpdatedData(data, dispatch, set_current_user_data);
    setEdit(false);
  };
  const handleMoreSave = async () => {
    await SaveUpdatedData(data, dispatch, set_current_user_data);
    setMoreEdit(false);
  };

  const handleCancel = () => {
    setData(redux_data);
    setEdit(false);
  };
  const handleMoreCancel = () => {
    setData(redux_data);
    setMoreEdit(false);
  };
  return (
    <div className="epemp-main-div">
      <div className="shrt-head-div">
        <h4>Edit Your CV</h4>
      </div>
      <React.Fragment>
        <div className="frag-profile">
          <div className="epemp-main-div-edit-main epemp-main-div-edit-main-employee">
            <h6 style={{ fontSize: 20 }}>Personal Details</h6>
            <div className="epemp-main-div-edit-inner-main">
              <div className="epemp-main-div-edit-inner epemp-main-div-edit-inner-btn">
                <button
                  style={!edit ? { display: "flex" } : { display: "none" }}
                  onClick={() => setEdit(true)}
                >
                  Edit
                </button>
                <button
                  style={edit ? { display: "flex" } : { display: "none" }}
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
                <button
                  style={
                    edit
                      ? {
                          display: "flex",
                          color: "#fff",
                          backgroundColor: "#3E469D",
                        }
                      : { display: "none" }
                  }
                  onClick={() => handleSave()}
                >
                  Save
                </button>
              </div>
              <div className="epemp-main-div-edit-inner-divs">
                <div className="epemp-main-div-edit-inner">
                  <label>Job Title</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.JobType}
                  </h6>
                  <div
                    className="select-div-prof-det-edit"
                    style={edit ? { display: "flex" } : { display: "none" }}
                  >
                    <Select
                      options={job_options}
                      onChange={(name) => {
                        setData({ ...data, JobType: name.value });
                      }}
                      id="select"
                      className="salary_opt_edit_prof_det"
                      placeholder={redux_data.JobType}
                    />
                  </div>
                </div>

                <div className="epemp-main-div-edit-inner">
                  <label>Work Experience</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.Experience}
                  </h6>
                  <div
                    className="select-div-prof-det-edit"
                    style={edit ? { display: "flex" } : { display: "none" }}
                  >
                    <select
                      onChange={(name) => {
                        setData({ ...data, Experience: name.target.value });
                      }}
                      value={data.Experience}
                      // className={this.sta}
                      placeholder="Experience"
                      required
                    >
                      <option>Fresher</option>
                      <option>0-1 years</option>
                      <option>2 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="epemp-main-div-edit-inner-divs">
                <div className="epemp-main-div-edit-inner">
                  <label>Education</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.Education ? redux_data.Education : ". . ."}
                  </h6>
                  <div
                    className="select-div-prof-det-edit"
                    style={edit ? { display: "flex" } : { display: "none" }}
                  >
                    <select
                      onChange={(name) => {
                        setData({ ...data, Education: name.target.value });
                      }}
                      value={data.Education}
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
                <div className="epemp-main-div-edit-inner">
                  <label>English Level</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.EnglishLevel}
                  </h6>
                  <div
                    className="select-div-prof-det-edit"
                    style={edit ? { display: "flex" } : { display: "none" }}
                  >
                    <select
                      onChange={(name) => {
                        setData({ ...data, EnglishLevel: name.target.value });
                      }}
                      value={data.EnglishLevel}
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
              <div className="epemp-main-div-edit-inner-divs">
                <div className="epemp-main-div-edit-inner">
                  <label>Job Timings</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.InterestedIn}
                  </h6>
                  <div
                    className="select-div-prof-det-edit"
                    style={edit ? { display: "flex" } : { display: "none" }}
                  >
                    <MultipleSelectCheckmarks
                      editingdata={data}
                      getMuiTimings={getMuiTimings}
                    />
                  </div>
                </div>
                <div className="epemp-main-div-edit-inner">
                  <label>Current Salary</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.CurrentSalary}
                  </h6>
                  <div
                    className="select-div-prof-det-edit"
                    style={edit ? { display: "flex" } : { display: "none" }}
                  >
                    <Select
                      options={salary_options}
                      onChange={(name) => {
                        setData({ ...data, CurrentSalary: name.value });
                      }}
                      id="select"
                      className="salary_opt_edit_prof_det"
                      placeholder="select your current salary"
                    />
                  </div>
                </div>
              </div>
              <div className="epemp-main-div-edit-inner-divs">
                <div
                  className="epemp-main-div-edit-inner "
                  // style={{ height: "auto" }}
                >
                  <label>Achievement</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.Achievement.substring(0, 50)}...
                  </h6>
                  <div
                    className="div-input-icon-emp-dash-edit-prof  epemp-main-div-edit-prof-det select-div-prof-det-edit"
                    style={edit ? { display: "flex" } : { display: "none" }}
                  >
                    <input
                      id="name"
                      name="name"
                      onChange={(name) => {
                        setData({ ...data, Achievement: name.target.value });
                      }}
                      type="text"
                      style={{
                        fontFamily: "Lato",
                        margin: 0,
                      }}
                      className=""
                      value={data.Achievement}
                    />
                  </div>
                </div>
                <div
                  className="epemp-main-div-edit-inner"
                  style={{ height: "auto" }}
                >
                  <label>Skills</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.Skills.substring(0, 50)}...
                  </h6>
                  <div
                    className="div-input-icon-emp-dash-edit-prof epemp-main-div-edit-prof-det select-div-prof-det-edit"
                    style={edit ? { display: "flex" } : { display: "none" }}
                  >
                    <CreatableMulti
                      redux_data={redux_data}
                      data={data}
                      getMultiMuiTimings={getMultiMuiTimings}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="epemp-main-div-edit-main-1st epemp-main-div-edit-main-1st-employee-profession">
            <h6 style={{ fontSize: 20 }}>More Details</h6>
            <div className="epemp-main-div-edit-inner epemp-main-div-edit-inner-btn">
              <button
                style={!moreEdit ? { display: "flex" } : { display: "none" }}
                onClick={() => setMoreEdit(true)}
              >
                Edit
              </button>
              <button
                style={moreEdit ? { display: "flex" } : { display: "none" }}
                onClick={() => handleMoreCancel()}
              >
                Cancel
              </button>
              <button
                style={
                  moreEdit
                    ? {
                        display: "flex",
                        color: "#fff",
                        backgroundColor: "#3E469D",
                      }
                    : { display: "none" }
                }
                onClick={() => handleMoreSave()}
              >
                Save
              </button>
            </div>
            <div className="epemp-main-div-edit-inner-main">
              <div className="epemp-main-div-edit-inner epemp-main-div-edit-inner-employee-profession-2">
                <label>GitHub Profile</label>
                <h6
                  style={!moreEdit ? { display: "flex" } : { display: "none" }}
                >
                  {/* <a href={redux_data.githubLink} target="_blank"> */}
                  {redux_data.githubLink ? redux_data.githubLink : "..."}
                  {/* </a> */}
                </h6>
                <div
                  className="div-input-icon-emp-dash-edit-prof  epemp-main-div-edit-prof-det"
                  style={moreEdit ? { display: "flex" } : { display: "none" }}
                >
                  <input
                    id="name"
                    name="name"
                    onChange={(name) => {
                      setData({ ...data, githubLink: name.target.value });
                    }}
                    type="text"
                    style={{
                      fontFamily: "Lato",
                      margin: 0,
                    }}
                    className=""
                    value={data.githubLink}
                  />
                </div>
              </div>
              <div className="epemp-main-div-edit-inner  epemp-main-div-edit-inner-employee-profession-2">
                <label>Previous Employer (if any)</label>
                <h6
                  style={!moreEdit ? { display: "flex" } : { display: "none" }}
                >
                  {redux_data.PreviousEmployers
                    ? redux_data.PreviousEmployers
                    : "..."}
                </h6>

                <div
                  className="div-input-icon-emp-dash-edit-prof  epemp-main-div-edit-prof-det"
                  style={moreEdit ? { display: "flex" } : { display: "none" }}
                >
                  <input
                    id="name"
                    name="name"
                    onChange={(name) => {
                      setData({
                        ...data,
                        PreviousEmployers: name.target.value,
                      });
                    }}
                    type="text"
                    style={{
                      fontFamily: "Lato",
                      margin: 0,
                    }}
                    className=""
                    value={data.PreviousEmployers}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}
export default EditProfessionalDetails;
