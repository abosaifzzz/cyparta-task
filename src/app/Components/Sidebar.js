import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faAngleDown,
  faBell,
  faBorderAll,
  faBriefcase,
  faCalendarCheck,
  faChevronRight,
  faCircleDollarToSlot,
  faClipboardCheck,
  faEnvelope,
  faFileLines,
  faFingerprint,
  faListCheck,
  faLock,
  faPen,
  faUser,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("");
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuVisible(!isSubMenuVisible);
    setActiveItem("employees");
  };

  return (
    <div className="sidebar w-full border border-gray-400 h-full rounded-3xl">
      <div className="logo py-10 flex justify-center items-center">
        <Image
          src="./logo.png"
          alt="Description of the image"
          width={140}
          height={50}
        />
      </div>
      <div className="nav">
        <ul>
          <li
            className={`text-sm font-medium my-3 ps-20 p-3 rounded-e-3xl cursor-pointer ${
              activeItem === "dashboard"
                ? "bg-red-100 text-red-800 border-s-4 border-red-700"
                : ""
            }`}
            onClick={() => setActiveItem("dashboard")}
          >
            <FontAwesomeIcon className="pe-4 text-xl" icon={faBorderAll} />{" "}
            Dashboard
          </li>
          <div className="employees w-full flex flex-col justify-end items-end">
            <li
              className={`text-sm w-full font-medium my-4 ps-20 p-3 rounded-e-3xl cursor-pointer ${
                activeItem === "employees"
                  ? "bg-red-100 text-red-800 border-s-4 border-red-700"
                  : ""
              }`}
              onClick={toggleSubMenu}
            >
              <FontAwesomeIcon className="pe-4 text-xl" icon={faUsers} />{" "}
              Employees
              <FontAwesomeIcon
                className="ps-14 text-xl"
                icon={faAngleDown}
              />{" "}
            </li>
            <div
              className={`sub-li w-4/6 overflow-hidden transition-all duration-500 ease-in-out ${
                isSubMenuVisible ? "max-h-screen" : "max-h-0"
              }`}
            >
              <ul className="flex flex-col">
                <Link href={"/profile"}>
                  <li className="text-sm py-1">
                    <FontAwesomeIcon
                      className="pe-1 text-gray-800"
                      icon={faUser}
                    />{" "}
                    Profile
                  </li>
                </Link>
                <li className="text-sm py-1">
                  <FontAwesomeIcon
                    className="pe-1 text-gray-800"
                    icon={faCalendarCheck}
                  />{" "}
                  Attendance
                </li>
                <li className="text-sm py-1">
                  <FontAwesomeIcon
                    className="pe-1 text-gray-800"
                    icon={faListCheck}
                  />{" "}
                  Tasks
                </li>
              </ul>
            </div>
          </div>
          <li
            className={`text-sm font-medium my-3 ps-20 p-3 rounded-e-3xl cursor-pointer ${
              activeItem === "payroll"
                ? "bg-red-100 text-red-800 border-s-4 border-red-700"
                : ""
            }`}
            onClick={() => setActiveItem("payroll")}
          >
            <FontAwesomeIcon
              className="pe-4 text-xl"
              icon={faCircleDollarToSlot}
            />{" "}
            Payroll
          </li>
          <li
            className={`text-sm font-medium my-3 flex items-center ps-20  p-3 rounded-e-3xl cursor-pointer ${
              activeItem === "holidays"
                ? "bg-red-100 p-4 text-red-800 border-s-4 border-red-700"
                : ""
            }`}
            onClick={() => setActiveItem("holidays")}
          >
            <FontAwesomeIcon className="pe-4 text-xl" icon={faClipboardCheck} />{" "}
            Holidays
          </li>
          <li
            className={`text-sm font-medium my-4 flex items-center ps-20 pe-8 p-3 rounded-e-3xl cursor-pointer ${
              activeItem === "advanced-payment"
                ? "bg-red-100 text-red-800 border-s-4 border-red-700"
                : ""
            }`}
            onClick={() => setActiveItem("advanced-payment")}
          >
            <FontAwesomeIcon className="pe-4 text-xl" icon={faWallet} />{" "}
            Advanced Payment
          </li>
          <Link href={"/"}>
            <li
              className={`text-sm font-medium my-4 flex items-center ps-20 pe-8 p-3 rounded-e-3xl cursor-pointer ${
                activeItem === "login"
                  ? "bg-red-100 text-red-800 border-s-4 border-red-700"
                  : ""
              }`}
              onClick={() => setActiveItem("login")}
            >
              <FontAwesomeIcon className="pe-4 text-xl" icon={faLock} /> Login
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
