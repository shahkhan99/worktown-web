import React, { useState, useEffect, ReactFragment } from "react";
import "./EditProfileEmployer.css";
import { useSelector, useDispatch } from "react-redux";
import { SaveUpdatedData, UpdatePassword } from "./backend";
import { set_current_user_data } from "../../../store/action/index";
import { MdLocationOn } from "react-icons/md";
import { BsEnvelope, BsFillTelephoneFill } from "react-icons/bs";
import { Button } from "@mui/material";

function EditProfileEmployer() {
  const dispatch = useDispatch();

  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );
  const [data, setData] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordC, setNewPasswordC] = useState("");
  const [edit, setEdit] = useState("");
  const [editP, setEditP] = useState("");
  // console.log(redux_data);
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
  const handlePCancel = () => {
    setNewPassword("");
    setNewPasswordC("");
    setEditP(false);
  };
  const handlePassword = (e, target) => {
    target(e);
  };
  const handleSavePassword = () => {
    if (newPassword === newPasswordC) {
      UpdatePassword(newPassword);
      setNewPassword("");
      setNewPasswordC("");
      setEditP(false);
    } else {
      alert("Passwords are not same.");
    }
  };
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
              <h6>{redux_data.BusinessName}</h6>
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
                  {redux_data.jobs !== undefined
                    ? Object.keys(redux_data.jobs).length
                    : 0}
                </p>
                <label>Jobs</label>
              </div>
              <div className="epemp-main-div-edit-main-1st-stat-inner">
                <p>
                  {redux_data.appointments !== undefined
                    ? Object.keys(redux_data.appointments).length
                    : 0}
                </p>{" "}
                <label>Interviews</label>
              </div>
              <div className="epemp-main-div-edit-main-1st-stat-inner">
                <p>
                  {redux_data.archive !== undefined
                    ? Object.keys(redux_data.archive).length
                    : 0}
                </p>{" "}
                <label>Archive</label>
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
          <div className="epemp-main-div-edit-main">
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
                  <label>Business name</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.BusinessName
                      ? redux_data.BusinessName
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
                        setData({ ...data, BusinessName: name.target.value });
                      }}
                      type="text"
                      style={{
                        fontFamily: "poppins",
                      }}
                      className=""
                      value={data.BusinessName}
                    />
                  </div>
                </div>
                <div className="epemp-main-div-edit-inner">
                  <label>Business URL</label>
                  <h6 style={!edit ? { display: "flex" } : { display: "none" }}>
                    {redux_data.BussinessURL
                      ? redux_data.BussinessURL
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
                        setData({ ...data, BussinessURL: name.target.value });
                      }}
                      type="text"
                      style={{
                        fontFamily: "poppins",
                      }}
                      className=""
                      value={data.BussinessURL}
                    />
                  </div>
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
                  <input
                    id="name"
                    name="name"
                    onChange={(name) => {
                      setData({ ...data, City: name.target.value });
                    }}
                    type="text"
                    style={{
                      fontFamily: "poppins",
                    }}
                    className=""
                    value={data.City}
                  />
                </div>
              </div>
              <div className="epemp-main-div-edit-inner div-input-icon-emp-dash-edit-prof-password">
                <label>Password</label>
                <div className="h6-emp-pass-upd-btn">
                  <h6
                    style={!editP ? { display: "flex" } : { display: "none" }}
                  >
                    ************
                  </h6>
                  <Button
                    style={!editP ? { display: "flex" } : { display: "none" }}
                    size="small"
                    variant="text"
                    onClick={() => setEditP(true)}
                  >
                    Change
                  </Button>
                </div>
                <div
                  className="div-input-icon-emp-dash-edit-prof-password-inner-main"
                  style={editP ? { display: "flex" } : { display: "none" }}
                >
                  <div
                    className="div-input-icon-emp-dash-edit-prof div-input-icon-emp-dash-edit-prof-password-inn"
                    style={editP ? { display: "flex" } : { display: "none" }}
                  >
                    <input
                      id="name"
                      name="name"
                      onChange={(name) => {
                        handlePassword(name.target.value, setNewPassword);
                      }}
                      type="password"
                      placeholder="New Password"
                      style={{
                        fontFamily: "poppins",
                      }}
                      className=""
                      value={newPassword}
                    />
                  </div>
                  <div
                    className="div-input-icon-emp-dash-edit-prof div-input-icon-emp-dash-edit-prof-password-inn"
                    style={editP ? { display: "flex" } : { display: "none" }}
                  >
                    <input
                      id="name"
                      name="name"
                      onChange={(name) => {
                        handlePassword(name.target.value, setNewPasswordC);
                      }}
                      type="password"
                      placeholder="Confirm New Password"
                      style={{
                        fontFamily: "poppins",
                      }}
                      className=""
                      value={newPasswordC}
                    />
                  </div>
                  <div className="New-Password-emp-edit-btn">
                    <Button
                      style={editP ? { display: "flex" } : { display: "none" }}
                      size="small"
                      variant="text"
                      onClick={() => handleSavePassword()}
                    >
                      Save
                    </Button>
                    <Button
                      style={editP ? { display: "flex" } : { display: "none" }}
                      size="small"
                      variant="text"
                      onClick={() => handlePCancel()}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}
export default EditProfileEmployer;
