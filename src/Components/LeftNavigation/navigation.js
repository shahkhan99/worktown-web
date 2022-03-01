import React, { useState } from "react";
import "./navigation.css";
import Logo from "../../assets/Logo/logo.png";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { FaUserNinja } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import { MdOutlineLibraryBooks } from "react-icons/md";

function Left_navigation({ checkNav }) {
  const [selected_nav, setSelected_nav] = useState(0);
  const [li_items, set_li_items] = useState([
    "Home",
    "Create A Contract",
    "Candidates",
    "Contracts",
    "Invoices & Receipts",
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
  return (
    <div className="nav-main-div">
      <div>
        <img src={Logo} width={70} height={70} />
        <h6>Work Hall Co</h6>
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
    </div>
  );
}

export default Left_navigation;
