import React, { useState } from "react";
import "./navigation.css";
import Logo from "../../assets/Logo/logo.png";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { FaUserNinja } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

function Left_navigation({ checkNav }) {
  const auth = getAuth();
  const [selected_nav, setSelected_nav] = useState(0);
  const [li_items, set_li_items] = useState([
    "Home",
    "Create A Contract",
    "Candidates",
    "Archieve",
    "Edit Profile",
    "Team Settings",
    "Perks",
  ]);
  const [li_items2, set_li_items2] = useState([
    "Account Settings",
    "Taxes",
    "Integrations       ",
    "Payment Methods",
  ]);
  const icons = [
    <AiOutlineHome color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
    <FaUserNinja color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
    <AiOutlinePlusCircle
      color="#f0bd3a"
      size={15}
      style={{ marginRight: 5 }}
    />,
    <RiPagesLine color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
    <MdOutlineLibraryBooks
      color="#f0bd3a"
      size={15}
      style={{ marginRight: 5 }}
    />,
    <AiOutlineHome color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
    <FaUserNinja color="#f0bd3a" size={15} style={{ marginRight: 5 }} />,
  ];
  checkNav(selected_nav);

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
  // console.log(redux_data);
  return (
    <div className="nav-main-div">
      <div>
        <h6>{redux_data !== undefined && redux_data.BusinessName}</h6>
      </div>
      <div className="nav-div">
        <ul className="nav-div-ul">
          {li_items.map((v, i) => {
            const Icon = icons[i];
            return (
              <li
                onClick={() => {
                  setSelected_nav(i);
                }}
                className={"li" + i}
                key={i}
                style={i == selected_nav ? { backgroundColor: "#d6d6d6" } : {}}
              >
                {Icon}
                {v}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="nav-div">
        <ul className="nav-div-ul2">
          {li_items2.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>
      <div className="logout-nav div-cand-card-btn ">
        <button className="div-cand-card-btn-int-rej" onClick={() => Logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Left_navigation;
