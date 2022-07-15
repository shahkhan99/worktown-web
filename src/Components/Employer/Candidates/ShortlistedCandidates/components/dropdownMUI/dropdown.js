import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";

import { BsFilterLeft } from "react-icons/bs";
import "./dropdown.css";
import MaxWidthDialog from "../dialogSelect/dialogSelect";

export default function ControlledOpenSelect({
  job_options,
  filterSplit,
  getFilterTitle,
  filterTyped,
  setFilterVJ,
}) {
  const [age, setAge] = React.useState("");
  const [checkopen, setCheckOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const [filterType, setFilterType] = React.useState("");

  let jobs_filter = [];
  job_options.forEach((e) => {
    jobs_filter.push(e.split("/"));
  });
  const handleChange = (target, event) => {
    target(event.target.value);
    getFilterTitle(event.target.value);
  };

  const handleClose = () => {
    setCheckOpen(false);
  };

  const handleOpen = () => {
    setCheckOpen(true);
  };
  // console.log(selected);

  return (
    <div style={{ width: "100%" }}>
      <MaxWidthDialog
        getFilterTitle={getFilterTitle}
        job_options={job_options}
        filterSplit={filterSplit}
        filterTyped={filterTyped}
        checkopen={checkopen}
        handleClosed={handleClose}
        setFilterVJ={setFilterVJ}
      />
      <BsFilterLeft
        color="#000"
        size={35}
        style={{ marginLeft: 0, width: 50 }}
        onClick={handleOpen}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={checkopen}
        onClick={handleClose}
        // style={{ width: "100%" }}
      ></Backdrop>
    </div>
  );
}
