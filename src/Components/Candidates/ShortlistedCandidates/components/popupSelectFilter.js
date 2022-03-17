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

export default function PopupSelectFilter({ getFilterTitle, job_options }) {
  const [open, setOpen] = React.useState(false);
  const [filterType, setFilterType] = React.useState("");

  const handleChange = (target, event) => {
    target(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
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
  console.log(jobs_filter);
  return (
    <div>
      <BsFilterLeft
        color="#000"
        size={35}
        style={{ marginRight: 15 }}
        onClick={() => handleClickOpen()}
      />
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
