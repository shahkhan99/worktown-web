import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { makeStyles } from "@material-ui/core";
import "./dialogSelect.css";

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    left: "32%",
    top: 100,
    borderRadius: 16,
    height: 500,
  },
  mainDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainDiv1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "75%",
    alignSelf: "center",
    height: "100%",
  },
});
export default function MaxWidthDialog({
  getFilterTitle,
  job_options,
  checkopen,
  handleClosed,
}) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(0);
  const [selectedJC, setSelectedJC] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [jobOpen, setJobOpen] = React.useState(false);
  const [jobCatOpen, setjobCatOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [filterType, setFilterType] = React.useState("");
  const [jobCat, setJobCat] = React.useState("");
  const [job_categories, SetJob_categories] = React.useState([]);

  var allJobsCat = [];
  React.useEffect(() => {
    setOpen(checkopen);
    if (jobCat === "") {
      job_options.length &&
        job_options.forEach((e) => {
          allJobsCat.push(e.JobCategory);
        });
      allJobsCat = [...new Set(allJobsCat)];
      SetJob_categories(allJobsCat);
      setJobCat(allJobsCat[0]);
      getFilterTitle(allJobsCat[0]);
    }
  });
  // console.log(job_categories, jobCat);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getFilterTitle(jobCat);
    handleClosed();
  };

  const handleJobCatClose = () => {
    setjobCatOpen(false);
  };

  const handleChangeJC = (target, event) => {
    setFilterType("");
    target(event.target.value);
    // getFilterCategory(event.target.value);
  };

  const handlejobCatOpen = () => {
    setjobCatOpen(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        classes={{
          paper: classes.dialog,
        }}
        className="dialog_dropdown"
      >
        <div className={classes.mainDiv1}>
          <DialogTitle>Filter by job category</DialogTitle>
          <div className="mainDiv1_dialog_dropdown">
            <FormControl sx={{ m: 1, minWidth: 0 }}>
              <Select
                // IconComponent={() => null}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={jobCatOpen}
                onClose={handleJobCatClose}
                onOpen={handlejobCatOpen}
                onChange={(e) => handleChangeJC(setJobCat, e)}
                style={{ width: 630, borderRadius: 0 }}
                className="dialog_select_dropdown"
                disableEscapeKeyDown
                placeholder="View job categories"
                // disabled
                value={jobCat}
              >
                {job_categories.length &&
                  job_categories.map((v, i) => (
                    <MenuItem
                      value={v}
                      key={i}
                      onClick={() => setSelectedJC(i)}
                      style={
                        selectedJC === i
                          ? {
                              backgroundColor: "#3e469d",
                              color: "#fff",
                              width: "100%",
                            }
                          : { width: "100%" }
                      }
                    >
                      {v}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
