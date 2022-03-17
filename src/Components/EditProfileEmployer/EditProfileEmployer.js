import React, { useState, useEffect, ReactFragment } from "react";
import "./EditProfileEmployer.css";
import { useSelector, useDispatch } from "react-redux";

function EditProfileEmployer() {
  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );
  console.log(redux_data);
  return (
    <div className="epemp-main-div">
      <div className="shrt-head-div">
        <h4>Edit Profile</h4>
      </div>
      <div className="epemp-main-div-edit-main">
        <h6>Personal Details</h6>
        <div className="epemp-main-div-edit-inner-main">
          <div className="epemp-main-div-edit-inner">
            <label>Name</label>
            <h6>Ahmed</h6>
          </div>
          <div className="epemp-main-div-edit-inner">
            <label>Name</label>
            <h6>Ahmed</h6>
          </div>
          <div className="epemp-main-div-edit-inner">
            <label>Name</label>
            <h6>Ahmed</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfileEmployer;
