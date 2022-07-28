import React, { useState, useEffect, ReactFragment } from "react";
import "./viewCV.css";
import { useSelector, useDispatch } from "react-redux";
// import { SaveUpdatedData } from "./backend";
import { set_current_user_data } from "../../../store/action/index";
import { BlobProvider, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

import MyPDF from "./pdfComponent/pdfComponent";

function ViewCV() {
  const dispatch = useDispatch();
  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );
  const [data, setData] = useState("");
  const [edit, setEdit] = useState("");

  // console.log(data);
  useEffect(() => {
    setData(redux_data);
  }, [redux_data]);

  return (
    <div className="epemp-main-div">
      <div className="shrt-head-div">
        <h4>Your Resume</h4>
      </div>
      <div className="epemp-main-div-edit-CV-main">
        <div className="epemp-main-div-edit-innerCV-main">
          {/* <BlobProvider document={<MyPDF />} /> */}
          {/* <PDFViewer height={900} width={620}>
            <MyPDF />
          </PDFViewer> */}
          <MyPDF data={data} />
          <PDFDownloadLink
            className="downloadnow_CV"
            document={<MyPDF data={data} />}
            fileName={`Resume-${data?.Name}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download now!"
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
export default ViewCV;
