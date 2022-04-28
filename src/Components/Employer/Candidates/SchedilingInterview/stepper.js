import * as React from "react";
import "./stepper.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AddVenue from "./components/AddVenue/AddVenue";
import AddVenueLocation from "./components/AddVenueLocation/AddVenueLocation";
import ReviewScheduling from "./components/ReviewScheduling/ReviewScheduling";
import SelectDate from "./components/SelectDate/SelectDate";
import Button from "@mui/material/Button";

const steps = [
  "Confirm venue",
  "Confirm venue location",
  "Confirm date/time",
  "Schedule",
];

export default function HorizontalLinearStepper({
  setNormal,
  setScheduleData,
  handleScheduleInterviewBtn,
  redux_data,
  scheduledCandidate,
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [showNext, setshowNext] = React.useState(false);
  const [skipped, setSkipped] = React.useState(new Set());
  const [data, setData] = React.useState({
    venue: "",
    venuePin: "",
    date: "",
    time: "",
  });

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleExit = () => {
    setScheduleData({});
    setNormal(true);
  };
  const handleSchedule = () => {
    let appointmentTime = { Interview_Details: data };
    let newObj = { ...scheduledCandidate, ...appointmentTime };
    setScheduleData(data);
    handleScheduleInterviewBtn(redux_data, newObj);
    setNormal(true);
  };

  // console.log(scheduledCandidate);
  const component = [
    <AddVenue handleNext={handleNext} setData={setData} data={data} />,
    <AddVenueLocation
      handleNext={handleNext}
      handleBack={handleBack}
      setData={setData}
      data={data}
    />,
    <SelectDate
      handleNext={handleNext}
      handleBack={handleBack}
      setData={setData}
      data={data}
    />,
    <ReviewScheduling
      handleSchedule={handleSchedule}
      handleBack={handleBack}
      data={data}
    />,
  ];

  // console.log(data);
  return (
    <Box sx={{ width: "100%", padding: "0px 30px" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} sx={{ height: 150 }} {...stepProps}>
              <StepLabel sx={{ display: "flex" }} {...labelProps}>
                {label}
                {/* {console.log(index)} */}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment></React.Fragment>
      ) : (
        <React.Fragment>
          <div className="stepper_exit_mui_btn_shortlisted">
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleExit();
              }}
            >
              Exit
            </Button>
          </div>
          {component[activeStep]}
        </React.Fragment>
      )}
    </Box>
  );
}
