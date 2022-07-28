import React, { useState } from "react";
import "./navigation.css";
import Logo from "../../assets/Logo/logo.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaUserNinja, FaUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { HiViewGrid, HiDocumentText, HiMenu } from "react-icons/hi";
import { MdArchive } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import MuiSwitches from "../MuiSwitch/switch";
import MuiSwitchesEmployee from "../MuiSwitchEmployee/switch";
import LOGO from "../../assets/Logo/logo.png";
import Businessicon from "./assets/businessIcon.png";
import { BsChevronDown, BsFillBagCheckFill } from "react-icons/bs";
import useMediaQuery from "@mui/material/useMediaQuery";

function Left_navigation({ checkNav, getEmployeeOrEmployer }) {
  const auth = getAuth();
  const [selected_nav, setSelected_nav] = useState(0);
  const [checkSide, setCheckSide] = useState(true);
  const [checkScreen, setCheckScreen] = useState(true);

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
    "Profile",
    "Your Resume / CV",
    // "Recommended Jobs",
    // "Scheduled Interviews",
    // "View Jobs",
  ]);
  const icons1 = [
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

    <FaUserCircle
      color={selected_nav === 2 ? "#fff" : "#000"}
      size={16}
      style={{ marginRight: 5 }}
    />,
    <HiDocumentText
      color={selected_nav === 3 ? "#fff" : "#000"}
      size={17}
      style={{ marginRight: 5 }}
    />,
  ];
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
      color={selected_nav === 5 ? "#fff" : "gray"}
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
  const redux_nav = useSelector(
    (state) => state.navigation_reducer.set_nav_selection
  );
  // console.log(redux_nav);
  getEmployeeOrEmployer(checkSide);
  let matches = useMediaQuery("(min-width:1050px)");

  React.useEffect(() => {
    if (!matches) {
      setCheckScreen(false);
    } else {
      setCheckScreen(true);
    }
    if (redux_nav === 1) {
      setSelected_nav(1);
      // console.log(selected_nav);
    }
  }, [redux_nav, matches]);
  if (!matches && !checkScreen) {
    const concernedElement = document.querySelector(".nav-main-div");
    document.addEventListener("mousedown", (event) => {
      if (concernedElement?.contains(event.target)) {
      } else {
        setCheckScreen(false);
      }
    });
  } else {
  }
  // console.log(selected_nav);

  const handleMatchChange = () => {
    checkScreen ? setCheckScreen(false) : setCheckScreen(true);
  };

  const handleLIchange = (i) => {
    setSelected_nav(i);
    if (!matches && checkScreen) {
      setTimeout(() => {
        setCheckScreen(false);
      }, 300);
    }
  };

  // console.log(matches, checkScreen);

  return (
    <React.Fragment>
      <div
        className="nav-main-div-resp"
        style={!matches ? { display: "flex" } : { display: "none" }}
      >
        <HiMenu
          onClick={() => handleMatchChange()}
          color="#3E469D"
          size={35}
          style={{ marginRight: 5 }}
        />
      </div>
      <div
        className="nav-main-div"
        style={checkScreen ? { display: "flex" } : { display: "none" }}
      >
        <a
          className="nav_div_cross_logo"
          style={{
            justifyContent: "center",
          }}
          href="/"
          target="_blank"
        >
          <img src={LOGO} className="logo-left-nav" />
        </a>
        <div className="left_nav_businessName">
          <img src={Businessicon} style={{ width: 15, height: 13 }} />
          <h6>{redux_data !== undefined && redux_data.BusinessName}</h6>
          <BsChevronDown color="#3E469D" size={16} />
        </div>
        <div className="nav-div">
          <ul className="nav-div-ul nav-div-ul-1">
            {checkSide
              ? li_items.map((v, i) => {
                  const Icon = icons[i];
                  return (
                    <li
                      onClick={
                        i == 5
                          ? () => {}
                          : () => {
                              handleLIchange(i);
                            }
                      }
                      className={"li" + i}
                      key={i}
                      style={
                        i == selected_nav
                          ? { backgroundColor: "#3E469D", color: "#fff" }
                          : i == 5
                          ? { color: "gray" }
                          : {}
                      }
                    >
                      {Icon}
                      {v}
                    </li>
                  );
                })
              : li_items2.map((v, i) => {
                  const Icon1 = icons1[i];
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
                      {Icon1}
                      {v}
                    </li>
                  );
                })}
          </ul>
        </div>
        <div className="nav-div">
          <ul className="nav-div-ul nav-div-ul-log">
            <li className={"li"}>
              <span
                onClick={() => Logout()}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <GoSignOut color="#000" size={16} style={{ marginRight: 5 }} />
                Logout
              </span>
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
