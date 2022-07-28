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
  filterSplit,
  filterTyped,
  checkopen,
  handleClosed,
  setFilterVJ,
}) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [jobOpen, setJobOpen] = React.useState(false);
  const [jobCatOpen, setjobCatOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [filterType, setFilterType] = React.useState("");
  const [jobCat, setJobCat] = React.useState("");

  React.useEffect(() => {
    setOpen(checkopen);
  });
  let jobs_filter = [];
  job_options.forEach((e) => {
    jobs_filter.push(e.split("/"));
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleClosed();
  };
  const handleJobClose = () => {
    setJobOpen(false);
  };
  const handleJobCatClose = () => {
    setjobCatOpen(false);
  };
  const handleChange = (target, event) => {
    setFilterVJ("");
    target(event.target.value);
    getFilterTitle(event.target.value);
    // console.log(event.target.value);
    setTimeout(() => {
      handleClose();
    }, 100);
  };

  const handlejobOpen = () => {
    setJobOpen(true);
  };
  const handlejobCatOpen = () => {
    setjobCatOpen(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
  let fil = `${filterSplit[0]}/${filterSplit[1]}`;
  // console.log(fil);

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
                value={"Software & IT"}
                onChange={(e) => handleChange(setJobCat, e)}
                style={{ width: 630, borderRadius: 0 }}
                className="dialog_select_dropdown"
                disableEscapeKeyDown
                placeholder="View job categories"
                disabled
              >
                <MenuItem
                  value="Software & IT"
                  style={{
                    width: "100%",
                  }}
                >
                  Software & IT
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <DialogTitle>Filter by job post</DialogTitle>
          <div className="mainDiv1_dialog_dropdown">
            <FormControl sx={{ m: 1, minWidth: 0 }}>
              <h6
                style={{ fontSize: 15, textAlign: "center" }}
                className="h6_dialog_filter"
              >
                {fil}
              </h6>
              <Select
                // IconComponent={() => null}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={jobOpen}
                onClose={handleJobClose}
                onOpen={handlejobOpen}
                onChange={(e) => handleChange(setFilterType, e)}
                style={{ width: 630, borderRadius: 0 }}
                className="dialog_select_dropdown"
              >
                {jobs_filter.map((v, i) => (
                  <MenuItem
                    style={
                      selected === i
                        ? {
                            backgroundColor: "#3e469d",
                            color: "#fff",
                            width: "100%",
                          }
                        : { width: "100%" }
                    }
                    key={i}
                    value={v[0] + "/" + v[1]}
                    onClick={() => setSelected(i)}
                  >
                    {`${v[0]}(${v[1]})`}
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
