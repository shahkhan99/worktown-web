import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { components } from "react-select";

const skills_options = [
  {
    value: "Android",
    label: "Android",
  },
  {
    value: "AWS",
    label: "AWS",
  },
  {
    value: "ASP .NET",
    label: "ASP .NET",
  },
  {
    value: "Angular",
    label: "Angular",
  },
  {
    value: "C#",
    label: "C#",
  },
  {
    value: "Django",
    label: "Django",
  },
  {
    value: "Html/Css",
    label: "Html/Css",
  },
  {
    value: "Java",
    label: "Java",
  },
  {
    value: "Javascript",
    label: "Javascript",
  },
  {
    value: "Laravel",
    label: "Laravel",
  },
  {
    value: "Node Js",
    label: "Node Js",
  },
  {
    value: "Objective C",
    label: "Objective C",
  },
  {
    value: "Php",
    label: "Php",
  },
  {
    value: "Python",
    label: "Python",
  },
  {
    value: "React Js",
    label: "React Js",
  },
  {
    value: "React Native",
    label: "React Native",
  },
  {
    value: "Swift",
    label: "Swift",
  },
  {
    value: "Wordpress",
    label: "Wordpress",
  },
];
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
  const handleInputChange = (e) => {
    // console.log(e, e.length);

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
      options={skills_options}
      isMulti
      onChange={(e) => handleInputChange(e)}
      components={{ Menu }}
      isValidNewOption={isValidNewOption}
    />
  );
}
