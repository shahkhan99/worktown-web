import React, { useState, useEffect } from "react";
import "./emp_db.css";
import { useSelector, useDispatch } from "react-redux";
import { set_current_user_data } from "../../store/action/index";
import Left_navigation from "../../Components/LeftNavigation/navigation";
import Stepper from "../../Components/Employer/CreateAContract/Emp_Create_Contract_Stepper/stepper";
import ShortlistedCandidates from "../../Components/Employer/Candidates/ShortlistedCandidates/ShortlistedCandidates";
import ViewJobsEmployee from "../../Components/Employee/Jobs/index";
import Archieve from "../../Components/Employer/Archieve/index";
import EditProfileEmployer from "../../Components/Employer/EditProfileEmployer/EditProfileEmployer";
import ViewJobsEmployer from "../../Components/Employer/ViewJobsEmployer/ViewJobsEmployer";
import Home from "../../Components/Employer/HomeContent/home";
import Loading from "../../assets/Loader/worktown-loader.gif";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUsers } from "../../Components/DashboardLoginSignup/backend/index";
function Employee_DB() {
  const [selected_nav, setSelected_nav] = useState(0);
  const [checking, setChecking] = useState(true);
  const [isUser, setIsUser] = useState();
  const [checkUser, setCheckUser] = useState("");

  const redux_data = useSelector((state) => state.dashboard_auth);
  const dispatch = useDispatch();
  // console.log(window.location.pathname);

  const auth = getAuth();

  const Components = [
    <Home />,
    <Stepper />,
    <ViewJobsEmployee />,
    <Archieve />,
    <EditProfileEmployer />,
    <ViewJobsEmployer />,
  ];
  useEffect(async () => {
    if (!isUser) {
      await getUsers(setCheckUser);
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uEmail = user.email;
          if (uEmail) {
            const getObjs = (obj) => Object.values(checkUser);
            let users = getObjs(checkUser);
            let gotEmail = users.filter((e) => {
              return e.Email === uEmail;
            });
            var result = gotEmail.find((obj) => {
              return obj.Email === uEmail;
            });
            dispatch(set_current_user_data(result));
            console.log(result);
            setIsUser(true);
            setChecking(false);
          }
          // ...
        } else {
          // User is signed out
          setIsUser(false);
          setChecking(false);
          window.location.replace(
            "http://localhost:3000/employer_dashboard/login"
          );
          // ...
        }
      });
    }
  }, [checkUser]);
  const checkNav = (e) => {
    setSelected_nav(e);
  };
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
        <div style={{ height: "100%", display: "flex", background: "#f3f0f0" }}>
          {/* <WTRouter /> */}
          <Left_navigation checkNav={checkNav} />
          {/* <Home /> */}
          {/* <SelectContract /> */}
          {/* <CreateContract /> */}
          {/* <JobDetails /> */}
          {/* <ContractDetail /> */}
          {/* <EmpData /> */}
          {/* <Compensation /> */}
          {/* <Stepper /> */}
          {Components[selected_nav]}
        </div>
      );
    } else {
      window.location.replace("http://localhost:3000/employer_dashboard/login");
    }
  }
}

export default Employee_DB;
