import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BsFilterLeft } from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function PopupSelectFilter({
  getFilterTitle,
  job_options,
  filterSplit,
}) {
  const [open, setOpen] = React.useState(false);
  const [filterType, setFilterType] = React.useState("");

  const handleChange = (target, event) => {
    target(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      console.log(filterType);
      getFilterTitle(filterType);
    }
  };
  let jobs_filter = [];
  job_options.forEach((e) => {
    jobs_filter.push(e.split("/"));
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  // console.log(jobs_filter);
  return (
    <div>
      <div className="div-cand-card-inner-skl-inn skl-inn-filter">
        <p onClick={() => handleClickOpen()}>
          {filterSplit[0] + "/" + filterSplit[1]}
          <MdOutlineArrowDropDown size={22} style={{ marginLeft: 5 }} />
        </p>
        <BsFilterLeft
          color="#000"
          size={35}
          style={{ marginRight: 15 }}
          onClick={() => handleClickOpen()}
        />
      </div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Filter by Job Post </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="demo-dialog-select-label">Job Post</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={filterType}
                defaultValue={filterType}
                placeholder={filterType}
                onChange={(e) => handleChange(setFilterType, e)}
                input={<OutlinedInput label="Filter" />}
              >
                {jobs_filter.length &&
                  jobs_filter.map((v, i) => (
                    <MenuItem key={i} value={v[0] + "/" + v[1]}>
                      {`${v[0]}(${v[1]})`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
