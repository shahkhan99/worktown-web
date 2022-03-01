import React, { useState } from "react";
import "./ContractDetail.css";
import { BiArrowBack } from "react-icons/bi";
import Select from "react-select";

function ContractDetail({
  getContractDetails,
  contractType,
  handleBack,
  handleNext,
}) {
  const [inputData, setInputData] = useState({
    companyName: "",
    address: "",
  });
  const handleInputChange = (target, e) => {
    setInputData({ ...inputData, [target]: e });
  };
  const handleCompNext = () => {
    let { companyName, address } = inputData;
    if (companyName !== "" && address !== "") {
      getContractDetails({ companyName, address });
      handleNext();
    }
  };
  return (
    <div className="create-cont-div">
      <div className="create-head-div">
        <h4>Creating a {contractType} contract</h4>
      </div>
      <div className="div-emp-info">
        <h6>Employee details</h6>
        <div className="div-inputs-emp">
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <p className="a-r-input-box inputs-emp-em inputs-emp-p">
              Employer:
              <span style={{ fontWeight: "bold" }}> &nbsp;Worktown</span>
            </p>
          </div>
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Company’s name"
              type="text"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              // value={this.state.name}
              onChange={(e) => {
                handleInputChange("companyName", e.target.value);
              }}
              className="a-r-input-box inputs-emp-em"
            />
          </div>
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <input
              placeholder="Client’s address"
              type="text"
              style={{
                fontFamily: "Lato",
                fontSize: 17,
                color: "#868686",
              }}
              onChange={(e) => {
                handleInputChange("address", e.target.value);
              }}
              // value={this.state.name}
              className="a-r-input-box inputs-emp-em"
            />
          </div>
          <div
            className="div-input-emp div-input-icon "
            style={{ backgroundColor: "transparent" }}
          >
            <p className="a-r-input-box inputs-emp-em inputs-emp-p ">
              Contract name:{" "}
              <span style={{ fontWeight: "bold" }}> &nbsp; {contractType}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="nxt-btn-emp">
        <button type="button" class="nxt-btn-btn" onClick={handleCompNext}>
          Next
        </button>
      </div>
      <div className="bck-btn-emp">
        <button type="button" class="bck-btn-btn" onClick={handleBack}>
          <BiArrowBack size={18} style={{ marginRight: 5 }} /> Back
        </button>
      </div>
    </div>
  );
}

export default ContractDetail;
