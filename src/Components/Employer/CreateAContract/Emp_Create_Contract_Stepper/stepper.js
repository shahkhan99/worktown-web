import * as React from "react";
import "./stepper.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CreateContract from "../CreateContract/create";
import EmpData from "../EmployeeData/empData";
import SelectContract from "..//SelectContract/SelectContract";
import ContractDetail from "../ContractDetails/ContractDetails";
import JobDetails from "../JobDetails/JobDetails";
import Compensation from "../Compensation/Compensation";
const steps = [
  "Select Contract",
  "Contract type",
  "Employee details",
  "Employee details",
  "Job details",
  "Compensation",
];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [showNext, setshowNext] = React.useState(false);
  const [skipped, setSkipped] = React.useState(new Set());
  const [contractData, setContractData] = React.useState({
    selectedContract: "",
    contractType: "",
    empFname: "",
    empLname: "",
    empEmail: "",
    empNation: "",
    empCity: "",
    empCompany: "",
    empAddress: "",
    jobCategory: "",
    jobTitle: "",
    timeTo: "",
    timeFrom: "",
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

  const getSelectedContract = (e) => {
    setContractData({ ...contractData, selectedContract: e });
    handleNext();
  };
  const getContractType = (e) => {
    setContractData({ ...contractData, contractType: e.head });
    handleNext();
  };
  const getEmpoleeData = (e) => {
    setContractData({
      ...contractData,
      empCity: e.city,
      empEmail: e.email,
      empFname: e.fname,
      empNation: e.nationality,
      empLname: e.lname,
    });
  };
  const getContractDetails = (e) => {
    setContractData({
      ...contractData,
      empCompany: e.companyName,
      empAddress: e.address,
    });
  };
  const getJobDetails = (e) => {
    setContractData({
      ...contractData,
      jobTitle: e.jobTitle,
      jobCategory: e.jobCat,
      timeFrom: e.handleFrom,
      timeTo: e.handleTo,
    });
  };
  const getComensations = (e) => {
    setContractData({
      ...contractData,
    });
  };

  console.log(contractData);
  const component = [
    <SelectContract getSelectedContract={getSelectedContract} />,
    <CreateContract getContractType={getContractType} />,
    <EmpData
      getEmpoleeData={getEmpoleeData}
      handleBack={handleBack}
      handleNext={handleNext}
      contractType={contractData.contractType}
    />,
    <ContractDetail
      getContractDetails={getContractDetails}
      contractType={contractData.contractType}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <JobDetails
      getJobDetails={getJobDetails}
      contractType={contractData.contractType}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <Compensation
      contractType={contractData.contractType}
      getComensations={getComensations}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
  ];

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
                {console.log(index)}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          {console.log(activeStep + 1)}
          {component[activeStep]}
          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext} disabled={activeStep <= 1}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box> */}
          {/* <div className="nxt-btn-emp">
            <button
              type="button"
              class="nxt-btn-btn"
              style={
                activeStep <= 1 ? { display: "none" } : { display: "flex" }
              }
            >
              Next
            </button>
          </div>
          <div className="bck-btn-emp">
            <button
              type="button"
              class="bck-btn-btn"
              onClick={handleBack}
              style={
                activeStep < 1
                  ? { display: "none" }
                  : { display: "flex", marginRight: 5 }
              }
            >
              <BiArrowBack size={18} style={{ marginRight: 5 }} /> Back
            </button>
          </div> */}
        </React.Fragment>
      )}
    </Box>
  );
}
