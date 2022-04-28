import React, { useState, useEffect, ReactFragment } from "react";
// import "./EditProfileEmployer.css";
import { useSelector, useDispatch } from "react-redux";
import { SaveUpdatedData } from "./backend";
import { set_current_user_data } from "../../../store/action/index";

function EditProfileEmployee() {
  const dispatch = useDispatch();

  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );
  const [data, setData] = useState("");
  const [edit, setEdit] = useState("");
  console.log(data);
  useEffect(() => {
    setData(redux_data);
  }, [redux_data]);

  const handleSave = async () => {
    await SaveUpdatedData(data, dispatch, set_current_user_data);
    setEdit(false);
  };
  return (
    <div className="epemp-main-div">
      <div className="shrt-head-div">
        <h4>Edit Profile</h4>
      </div>
      <div className="epemp-main-div-edit-main">
        <h6 style={{ fontSize: 15 }}>Personal Details</h6>
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
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
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
                  fontFamily: "Lato",
                }}
                className=""
                value={data.Name}
              />
            </div>
          </div>

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
                  setData({ ...data, AlternativePhone: name.target.value });
                }}
                type="text"
                style={{
                  fontFamily: "Lato",
                }}
                className=""
                value={data.AlternativePhone}
              />
            </div>
          </div>
          <div className="epemp-main-div-edit-inner">
            <label>Email</label>
            <h6>{redux_data.Email}</h6>
            {/* <div
              className="div-input-icon-emp-dash-edit-prof"
              style={edit ? { display: "flex" } : { display: "none" }}
            >
              <input
                id="name"
                name="name"
                onChange={(name) => {
                  setData({ ...data, Email: name.target.value });
                }}
                type="text"
                style={{
                  fontFamily: "Lato",
                }}
                className=""
                value={data.Email}
              />
            </div> */}
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
                  fontFamily: "Lato",
                }}
                className=""
                value={data.City}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfileEmployee;
