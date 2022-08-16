import React, { useState, useEffect, ReactFragment } from "react";
import "./EditProfileEmployer.css";
import { useSelector, useDispatch } from "react-redux";
import { SaveUpdatedData } from "./backend";
import { set_current_user_data } from "../../../store/action/index";
import { MdLocationOn } from "react-icons/md";
import { BsEnvelope, BsFillTelephoneFill } from "react-icons/bs";

import Select from "react-select";
import pakCities from "../../../Features/HomePage/usefullArrays/pakCities";

function EditProfileEmployee() {
  const dispatch = useDispatch();

  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );
  const [data, setData] = useState("");
  const [edit, setEdit] = useState("");
  useEffect(() => {
    setData(redux_data);
  }, [redux_data]);

  const handleSave = async () => {
    await SaveUpdatedData(data, dispatch, set_current_user_data);
    setEdit(false);
  };
  const handleCancel = () => {
    setData(redux_data);
    setEdit(false);
  };
  // console.log(redux_data.employee_side_all_time_shorlisted);
  return (
    <div className="epemp-main-div">
      <div className="shrt-head-div">
        <h4>Profile</h4>
      </div>
      <React.Fragment>
        <div className="frag-profile">
          <div className="epemp-main-div-edit-main-1st">
            <div className="epemp-main-div-edit-main-1st-name">
              <h4>{redux_data.Name}</h4>
              <h6>
                {redux_data.BusinessName
                  ? redux_data.BusinessName
                  : redux_data.PreviousEmployers}
              </h6>
              <p>
                <MdLocationOn
                  color="#3E469D"
                  size={15}
                  style={{ marginRight: 0 }}
                />
                {redux_data.City}
              </p>
            </div>
            <div className="epemp-main-div-edit-main-1st-stat">
              <div className="epemp-main-div-edit-main-1st-stat-inner">
                <p>
                  {redux_data.employee_side_appointments === undefined
                    ? 0
                    : Object.keys(redux_data.employee_side_appointments).length}
                </p>{" "}
                <label>Interviews</label>
              </div>
              <div className="epemp-main-div-edit-main-1st-stat-inner">
                <p>
                  {redux_data.employee_side_shorlisted === undefined
                    ? 0
                    : redux_data.employee_side_shorlisted
                        .employee_side_shorlisted}
                </p>{" "}
                <label>Shortlisted in</label>
              </div>
            </div>
            <div className="epemp-main-div-edit-main-1st-info">
              <div className="epemp-main-div-edit-main-1st-info-inner">
                <span>
                  <BsFillTelephoneFill
                    color="#3E469D  "
                    size={18}
                    style={{ marginRight: 0 }}
                  />
                </span>
                <p>{redux_data.Phone}</p>
              </div>
              <div className="epemp-main-div-edit-main-1st-info-inner">
                <span>
                  <BsEnvelope
                    color="#3E469D"
                    size={18}
                    style={{ marginRight: 0 }}
                  />
                </span>
                <p>{redux_data.Email} </p>
              </div>
            </div>
          </div>
          <div className="epemp-main-div-edit-main epemp-main-div-edit-main1">
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
                  <label>Full name</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.Name}
                  </h6>
                  <div
                    style={edit ? { display: "flex" } : { display: "none" }}
                    className="div-input-icon-emp-dash-edit-prof"
                  >
                    <input
                      id="name"
                      name="name"
                      onChange={(name) => {
                        setData({ ...data, Name: name.target.value });
                      }}
                      type="text"
                      style={{
                        fontFamily: "poppins",
                      }}
                      className=""
                      value={data.Name}
                    />
                  </div>
                </div>
                <div className="epemp-main-div-edit-inner">
                  <label>Email</label>
                  <h6>{redux_data.Email}</h6>
                </div>
              </div>
              <div className="epemp-main-div-edit-inner-divs">
                <div className="epemp-main-div-edit-inner">
                  <label>Phone number</label>
                  <h6>{redux_data.Phone}</h6>
                </div>
                <div className="epemp-main-div-edit-inner">
                  <label>Alternative phone number</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.AlternativePhone
                      ? redux_data.AlternativePhone
                      : ". . ."}
                  </h6>
                  <div
                    className="div-input-icon-emp-dash-edit-prof"
                    style={edit ? { display: "flex" } : { display: "none" }}
                  >
                    <input
                      id="name"
                      name="name"
                      onChange={(name) => {
                        setData({
                          ...data,
                          AlternativePhone: name.target.value,
                        });
                      }}
                      type="text"
                      style={{
                        fontFamily: "poppins",
                      }}
                      className=""
                      value={data.AlternativePhone}
                    />
                  </div>
                </div>
              </div>
              <div className="epemp-main-div-edit-inner">
                <label>City</label>
                <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                  {redux_data.City}
                </h6>
                <div
                  className="div-input-icon-emp-dash-edit-prof"
                  style={edit ? { display: "flex" } : { display: "none" }}
                >
                  <Select
                    options={pakCities}
                    onChange={(name) => {
                      setData({ ...data, City: name.value });
                    }}
                    id="select"
                    className="salary_opt_edit_prof_det"
                    placeholder={data.City}
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
export default EditProfileEmployee;
