import React, { useState } from "react";
import "./navigation.css";
import Logo from "../../assets/Logo/logo.png";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { FaUserNinja, FaRegEdit, FaUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { HiViewGrid } from "react-icons/hi";
import { MdArchive } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import MuiSwitches from "../MuiSwitch/switch";
import MuiSwitchesEmployee from "../MuiSwitchEmployee/switch";
import LOGO from "../../assets/Logo/logo.png";
import Businessicon from "./assets/businessIcon.png";
import { BsChevronDown, BsFillBagCheckFill } from "react-icons/bs";

function Left_navigation({ checkNav, getEmployeeOrEmployer }) {
  const auth = getAuth();
  const [selected_nav, setSelected_nav] = useState(0);
  const [checkSide, setCheckSide] = useState(true);
  const [checkScreen, setCheckScreen] = useState(
    !window.innerWidth > 766 ? false : true
  );

  const [li_items, set_li_items] = useState([
    "Home",
    "Candidates",
    "Job Posts",
    "Profile",
    "Archive",
    "Contracts",
  ]);
  const [li_items2, set_li_items2] = useState([
    "Home",
    "Professional Details",
    "Your Resume / CV",
    "Profile",
    // "Recommended Jobs",
    // "Scheduled Interviews",
    // "View Jobs",
  ]);
  const icons = [
    <HiViewGrid
      color={selected_nav === 0 ? "#fff" : "#000"}
      size={16}
      style={{ marginRight: 5 }}
    />,

    <FaUserNinja
      color={selected_nav === 1 ? "#fff" : "#000"}
      size={16}
      style={{ marginRight: 5 }}
    />,
    <BsFillBagCheckFill
      color={selected_nav === 2 ? "#fff" : "#000"}
      size={16}
      style={{ marginRight: 5 }}
    />,
    <FaUserCircle
      color={selected_nav === 3 ? "#fff" : "#000"}
      size={16}
      style={{ marginRight: 5 }}
    />,
    <MdArchive
      color={selected_nav === 4 ? "#fff" : "#000"}
      size={16}
      style={{ marginRight: 5 }}
    />,
    <AiOutlinePlusCircle
      color={selected_nav === 5 ? "#fff" : "#000"}
      size={16}
      style={{ marginRight: 5 }}
    />,
  ];
  checkNav(selected_nav);

  const handleCheck = (e) => {
    setCheckSide(e);
    // setSelected_nav(0);
  };
  const handleSwitchEmployee = (e) => {
    // setCheckSide(e);
  };
  const Logout = () => {
    signOut(auth)
      .then(() => {
        window.location.replace("/portal/login");
        // window.location.replace("http://localhost:3000/portal/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const redux_data = useSelector(
    (state) => state.dashboard_auth.set_current_user_data
  );
  getEmployeeOrEmployer(checkSide);
  return (
    <React.Fragment>
      <div className="nav-main-div-resp">
        <button
          onClick={() => setCheckScreen(true)}
          style={!checkScreen ? { display: "flex" } : { display: "none" }}
        >
          CHANGE
        </button>
      </div>
      <div
        className="nav-main-div"
        style={checkScreen ? { display: "flex" } : { display: "none" }}
      >
        <div
          className="nav_div_cross_logo"
          style={
            checkScreen
              ? !window.innerWidth > 766
                ? { justifyContent: "space-between" }
                : { justifyContent: "center" }
              : { justifyContent: "center" }
          }
        >
          <img src={LOGO} className="logo-left-nav" />
          <button
            onClick={() => setCheckScreen(false)}
            style={
              checkScreen
                ? !window.innerWidth > 766
                  ? { display: "flex" }
                  : { display: "none" }
                : { display: "none" }
            }
          >
            X
          </button>
        </div>
        <div className="left_nav_businessName">
          <img src={Businessicon} style={{ width: 15, height: 13 }} />
          <h6>{redux_data !== undefined && redux_data.BusinessName}</h6>
          <BsChevronDown color="#3E469D" size={16} />
        </div>
        <div className="nav-div">
          <ul className="nav-div-ul">
            {checkSide
              ? li_items.map((v, i) => {
                  const Icon = icons[i];
                  return (
                    <li
                      onClick={() => {
                        setSelected_nav(i);
                      }}
                      className={"li" + i}
                      key={i}
                      style={
                        i == selected_nav
                          ? { backgroundColor: "#3E469D", color: "#fff" }
                          : {}
                      }
                    >
                      {Icon}
                      {v}
                    </li>
                  );
                })
              : li_items2.map((v, i) => {
                  const Icon = icons[i];
                  return (
                    <li
                      onClick={() => {
                        setSelected_nav(i);
                      }}
                      className={"li" + i}
                      key={i}
                      style={
                        i == selected_nav
                          ? { backgroundColor: "#2C72E5", color: "#fff" }
                          : {}
                      }
                    >
                      {Icon}
                      {v}
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className="nav-div">
          <ul className="nav-div-ul">
            <li onClick={() => Logout()} className={"li"}>
              <GoSignOut color="#000" size={16} style={{ marginRight: 5 }} />
              Logout
            </li>
          </ul>
        </div>

        <div className="nav-div-switches">
          <MuiSwitches
            handleCheck={handleCheck}
            setSelected_nav={setSelected_nav}
          />
          <MuiSwitchesEmployee
            handleSwitchEmployee={handleSwitchEmployee}
            checkSide={checkSide}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Left_navigation;
