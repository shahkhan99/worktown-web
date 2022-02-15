import React, { useState } from "react";
import "./navigation.css";
import Logo from "../../assets/Logo/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserNinja } from "react-icons/fa";

function Left_navigation() {
  const [li_items, set_li_items] = useState([
    "Home",
    "Candidates",
    "Contracts",
    "Compliance Documents",
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
    <AiOutlineHome color="#3D459D" size={15} style={{ marginRight: 5 }} />,
    <FaUserNinja color="#3D459D" size={15} style={{ marginRight: 5 }} />,
    <AiOutlineHome color="#3D459D" size={15} style={{ marginRight: 5 }} />,
    <FaUserNinja color="#3D459D" size={15} style={{ marginRight: 5 }} />,
    <AiOutlineHome color="#3D459D" size={15} style={{ marginRight: 5 }} />,
    <AiOutlineHome color="#3D459D" size={15} style={{ marginRight: 5 }} />,
    <FaUserNinja color="#3D459D" size={15} style={{ marginRight: 5 }} />,
  ];

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
            console.log(Icon);
            return (
              <li className={"li" + i} key={i}>
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
