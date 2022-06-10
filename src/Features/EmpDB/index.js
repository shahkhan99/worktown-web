import React, { useState, useEffect } from "react";
import "./emp_db.css";
import { useSelector, useDispatch } from "react-redux";
import { set_current_user_data } from "../../store/action/index";
import Left_navigation from "../../Components/LeftNavigation/navigation";
import Stepper from "../../Components/Employer/CreateAContract/Emp_Create_Contract_Stepper/stepper";
import ShortlistedCandidates from "../../Components/Employer/Candidates/ShortlistedCandidates/ShortlistedCandidates";
import Archieve from "../../Components/Employer/Archieve/index";
import EditProfileEmployer from "../../Components/Employer/EditProfileEmployer/EditProfileEmployer";
import EditProfileEmployee from "../../Components/Employee/EditProfileEmployee/EditProfileEmpolyee";
import EditProfessionalDetails from "../../Components/Employee/EditProfessionalDetails/EditProfessionalDetails";
import ViewCV from "../../Components/Employee/ViewYourCV/viewCV";
import ViewJobsEmployer from "../../Components/Employer/ViewJobsEmployer/ViewJobsEmployer";
import ScheduledInterview from "../../Components/Employee/ScheduledInterview/ScheduledInterview";
import ViewJobsEmployee from "../../Components/Employee/Jobs/index";
import Home from "../../Components/Employer/HomeContent/home";
import Home1 from "../../Components/Employee/HomeContent/home";
import Loading from "../../assets/Loader/worktown-loader.gif";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUsers } from "../../Components/DashboardLoginSignup/backend/index";
function Employer_DB() {
  const [selected_nav, setSelected_nav] = useState(0);
  const [checking, setChecking] = useState(true);
  const [isUser, setIsUser] = useState();
  const [checkUser, setCheckUser] = useState("");
  const [checkSide, setCheckSide] = useState(true);
  const redux_data = useSelector((state) => state.dashboard_auth);
  const dispatch = useDispatch();
  console.log(redux_data);

  const auth = getAuth();

  const Components = [
    <Home />,
    <ShortlistedCandidates />,
    <ViewJobsEmployer />,
    <EditProfileEmployer />,
    <Archieve />,
    <Stepper />,
  ];
  const Components1 = [
    <Home1 />,
    <EditProfessionalDetails />,
    <EditProfileEmployee />,
    <ViewCV />,
    <ScheduledInterview />,
  ];
  const getEmployeeOrEmployer = (e) => {
    setCheckSide(e);
  };
  useEffect(async () => {
    if (!isUser) {
      await getUsers(setCheckUser);
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uEmail = user.email;
          if (uEmail) {
            // console.log("checkUser", uEmail);
            if (checkUser) {
              const getObjs = (obj) => Object.values(checkUser);
              let users = getObjs(checkUser);
              let gotEmail = users.filter((e) => {
                return e.Email === uEmail;
              });
              var result = gotEmail.find((obj) => {
                return obj.Email === uEmail;
              });
              dispatch(set_current_user_data(result));
              // console.log(checkUser);
              setIsUser(true);
              setChecking(false);
            } else {
              setIsUser(false);
            }
          }
          // ...
        } else {
          // User is signed out
          setIsUser(false);
          setChecking(false);
          window.location.replace("http://localhost:3000/portal/login");
          // ...
        }
      });
    }
  }, [checkUser]);
  const checkNav = (e) => {
    setSelected_nav(e);
  };
  // console.log(checkUser, isUser);
  if (checking) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Loading} />
      </div>
    );
  } else {
    if (isUser) {
      return (
        <div style={{ height: "100%", display: "flex", background: "#F5F5F5" }}>
          {/* <WTRouter /> */}
          <Left_navigation
            checkNav={checkNav}
            getEmployeeOrEmployer={getEmployeeOrEmployer}
          />
          {/* <Home /> */}
          {/* <SelectContract /> */}
          {/* <CreateContract /> */}
          {/* <JobDetails /> */}
          {/* <ContractDetail /> */}
          {/* <EmpData /> */}
          {/* <Compensation /> */}
          {/* <Stepper /> */}
          {checkSide ? Components[selected_nav] : Components1[selected_nav]}
        </div>
      );
    } else {
      window.location.replace("http://localhost:3000/portal/login");
    }
  }
}

export default Employer_DB;
