import React, { useState } from "react";
import "./navigation.css";
import Logo from "../../assets/Logo/logo.png";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { FaUserNinja, FaRegEdit } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import { HiViewGrid } from "react-icons/hi";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import MuiSwitches from "../MuiSwitch/switch";

function Left_navigation({ checkNav, getEmployeeOrEmployer }) {
  const auth = getAuth();
  const [selected_nav, setSelected_nav] = useState(0);
  const [checkSide, setCheckSide] = useState(true);
  const [li_items, set_li_items] = useState([
    "Home",
    "Candidates",
    "View Job Posts",
    "Create A Contract",
    "Archive",
    "Edit Profile",
  ]);
  const [li_items2, set_li_items2] = useState([
    "Home",
    "View Jobs",
    "Create A Contract",
    "Archive",
    "Edit Profile",
    // "View Jobs",
  ]);
  const icons = [
    <AiOutlineHome color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
    <AiOutlinePlusCircle
      color="#f0bd3a"
      size={15}
      style={{ marginRight: 5 }}
    />,
    <FaUserNinja color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
    <HiViewGrid color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
    <RiPagesLine color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
    <FaRegEdit color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
  ];
  checkNav(selected_nav);

  const handleCheck = (e) => {
    setCheckSide(e);
  };
  const Logout = () => {
    signOut(auth)
      .then(() => {
        window.location.replace(
          "http://localhost:3000/employer_dashboard/login"
        );
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
    <div className="nav-main-div">
      <div>
        <h6>{redux_data !== undefined && redux_data.BusinessName}</h6>
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
                      i == selected_nav ? { backgroundColor: "#d6d6d6" } : {}
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
                      i == selected_nav ? { backgroundColor: "#d6d6d6" } : {}
                    }
                  >
                    {Icon}
                    {v}
                  </li>
                );
              })}
        </ul>
      </div>
      <div className="logout-nav div-cand-card-btn ">
        <button className="div-cand-card-btn-int-rej" onClick={() => Logout()}>
          Logout
        </button>
      </div>
      <MuiSwitches handleCheck={handleCheck} />
    </div>
  );
}

export default Left_navigation;
