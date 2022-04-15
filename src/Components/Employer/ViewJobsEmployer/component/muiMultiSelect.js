import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Full Time",
  "Part Time",
  "Freelance",
  "Night Shift",
  "Remote",
  "Work From Home",
];

export default function MultipleSelectCheckmarks({
  editingdata,
  getMuiTimings,
}) {
  const [personName, setPersonName] = React.useState([]);
  // React.useEffect(() => {
  //   if (editingdata !== "") {
  //     let arr = [editingdata.InterestedIn];
  //     setPersonName(arr);
  //     console.log("value");
  //   }
  // }, [editingdata]);
  // console.log(personName);

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    // console.log(value);
    if (personName.includes("Part Time")) {
    }
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    getMuiTimings(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div style={{ width: "100%" }}>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          style={{ fontSize: 13 }}
          onChange={handleChange}
          input={<OutlinedInput style={{ width: "100%" }} label="Timings" />}
          renderValue={(selected) => {
            // console.log(selected);
            return selected.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              disabled={
                personName.includes("Part Time") && name === "Full Time"
                  ? true
                  : personName.includes("Full Time") && name === "Part Time"
                  ? true
                  : false
              }
              key={name}
              value={name}
            >
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
