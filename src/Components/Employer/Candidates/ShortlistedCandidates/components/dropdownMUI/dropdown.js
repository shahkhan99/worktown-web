import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";

import { BsFilterLeft } from "react-icons/bs";
import "./dropdown.css";

export default function ControlledOpenSelect({
  job_options,
  filterSplit,
  getFilterTitle,
}) {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
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
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // console.log(selected);

  return (
    <div style={{ width: "100%" }}>
      <FormControl sx={{ m: 1, minWidth: 0 }}>
        <Select
          IconComponent={() => null}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value=""
          onChange={(e) => handleChange(setFilterType, e)}
          style={{ width: 630, borderRadius: 13 }}
          disableEscapeKeyDown
          // MenuProps={{
          //   style: { zIndex: 35001 },
          // }}
        >
          {jobs_filter.length
            ? jobs_filter.map((v, i) => (
                <MenuItem
                  style={
                    selected === i
                      ? {
                          backgroundColor: "#3e469d",
                          color: "#fff",
                          width: 630,
                          borderRadius: 13,
                        }
                      : { width: 630 }
                  }
                  key={i}
                  value={v[0] + "/" + v[1]}
                  onClick={() => setSelected(i)}
                >
                  {`${v[0]}(${v[1]})`}
                </MenuItem>
              ))
            : ""}
        </Select>
      </FormControl>
      <BsFilterLeft
        color="#000"
        size={35}
        style={{ marginLeft: 0, width: 50 }}
        onClick={handleOpen}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        // style={{ width: "100%" }}
      ></Backdrop>
    </div>
  );
}
