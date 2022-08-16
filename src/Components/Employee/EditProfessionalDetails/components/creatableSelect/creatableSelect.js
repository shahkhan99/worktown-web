import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { components } from "react-select";
import {
  skills_options_DM,
  skills_options_GD,
  skills_options_SW_IT,
} from "../skills_options";

const Menu = (props) => {
  const optionSelectedLength = props.getValue().length || 0;
  return (
    <components.Menu {...props}>
      {optionSelectedLength < 10 ? (
        props.children
      ) : (
        <div>Max limit achieved</div>
      )}
    </components.Menu>
  );
};
export default function CreatableMulti({
  redux_data,
  data,
  getMultiMuiTimings,
}) {
  // console.log(data);
  const handleInputChange = (e) => {
    if (e.length < 11) {
      let obj = e.map((v) => {
        return v.value;
      });
      // console.log(obj);
      getMultiMuiTimings(obj);
    } else {
      alert("You can only add upto 10 skills");
    }
  };
  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 10;
  return (
    <CreatableSelect
      className="salary_opt_edit_prof_det salary_opt_edit_prof_det123"
      options={
        data.JobCategory === "Graphics & Design Jobs"
          ? skills_options_GD
          : data.JobCategory === "Digital Marketing Jobs"
          ? skills_options_DM
          : skills_options_SW_IT
      }
      isMulti
      onChange={(e) => handleInputChange(e)}
      components={{ Menu }}
      isValidNewOption={isValidNewOption}
    />
  );
}
