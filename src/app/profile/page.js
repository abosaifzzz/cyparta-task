"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
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

export default function Profile() {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  // const [activeItem, setActiveItem] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleEditClick = () => {
    setIsPopupVisible(true);
  };

  const handleCancelClick = () => {
    setIsPopupVisible(false);
  };

  const toggleSubMenu = () => {
    setIsSubMenuVisible(!isSubMenuVisible);
    setActiveItem("employees");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setProfile(response.data);
        console.log("data prof", response.data);
      } catch (err) {
        console.error("Error fetching profile data", err);
        setError("Failed to fetch profile data");
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className="profile p-5  flex gap-3 h-screen bg-[#F8F8F8]">
        <div className="side w-1/5">
          <Sidebar></Sidebar>
        </div>
        <div className="content w-4/5 h-full relative ">
          {isPopupVisible && (
            <div className="popup inset-0 absolute flex justify-center items-center bg-black bg-opacity-35">
              <div className="edit-form w-2/3 h-5/6 flex flex-col justify-center items-center bg-white rounded-lg">
                <div className="edit-img relative mb-3">
                  <Image
                    src="./man.png"
                    alt="Profile Image"
                    className="rounded-md border border-emerald-500 bg-white"
                    width={130}
                    height={60}
                  />
                  <div className="edit-img-btn absolute right-0 bottom-0">
                    <FontAwesomeIcon
                      className="p-2 cursor-pointer bg-white border border-gray-700 rounded-full text-xl"
                      icon={faPen}
                    />
                  </div>
                </div>
                <div className="edit-bio flex justify-center items-center">
                  <label>Edit Bio:</label>
                  <input
                    className="bg-gray-50 shadow-sm ms-2 rounded-md p-1 border border-gray-400"
                    type="text"
                  />
                </div>
                <div className="edit-names w-full flex gap-9 mt-4 p-2 px-10">
                  <div className="edit-first-name w-1/2 h-1/2">
                    <label className="block">Edit First Name</label>
                    <input
                      className="bg-gray-50 shadow-sm mt-1 w-full rounded-md p-1 border border-gray-400"
                      type="text"
                    />
                  </div>
                  <div className="edit-last-name w-1/2 h-1/2">
                    <label className="block">Edit Last Name</label>
                    <input
                      className="bg-gray-50 shadow-sm mt-1 w-full rounded-md p-1 border border-gray-400"
                      type="text"
                    />
                  </div>
                </div>
                <div className="edit-phone-email w-full flex gap-9 mt-4 h-1/4 p-2 px-10">
                  <div className="edit-phone w-1/2 h-1/2">
                    <label className="block">Edit Mobile Number</label>
                    <input
                      className="bg-gray-50 shadow-sm mt-1 w-full rounded-md p-1 border border-gray-400"
                      type="tel"
                    />
                  </div>
                  <div className="edit-email w-1/2 h-1/2">
                    <label className="block">Edit Email</label>
                    <input
                      className="bg-gray-50 shadow-sm mt-1 w-full rounded-md p-1 border border-gray-400"
                      type="email"
                    />
                  </div>
                </div>
                <div className="action-btns flex justify-between w-full pt-5 px-20">
                  <button
                    className="cancel bg-black text-white p-2 px-8 rounded-md"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                  <button className="save bg-green-600 text-white p-2 px-8 rounded-md">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="user-nav p-2 gap-3 flex justify-end px-14 ">
            <div className="notification bg-slate-300 px-4 rounded-lg flex justify-center items-center ">
              <FontAwesomeIcon className=" text-xl" icon={faBell} />{" "}
            </div>
            {/* <Image
              src="https://sadakatcdn.cyparta.com/Cyparta_System/Users/ProfileLogo/nissan-skyline-gt-r-r32-nfs-5k-ze-1440x900.jpg"
              alt="Description of the image"
              className="rounded-full border border-emerald-500 bg-white"
              width={50}
              height={10}
            /> */}
            <img src={profile?.image} className="w-10 h-10 rounded-full" />
          </div>
          <div className="user-info  mx-7 bg-slate-50">
            <span className="text-sm font-semibold pe-2">Employees</span>{" "}
            <span className="text-sm font-semibold pe-2">
              <FontAwesomeIcon className=" text-sm" icon={faChevronRight} />{" "}
            </span>
            <span className="text-sm font-semibold pe-2">Profile</span>
            <div className="user-status border-b border-gray-300 pb-1 flex justify-between items-end w-5/6 ">
              <div className="name-photo mt-4 flex">
                <img src={profile?.image} className="w-24 h-24 rounded-md" />

                <div className="personal ms-2">
                  <p className="font-bold">{profile?.first_name}</p>
                  <p className="text-sm mt-1  text-gray-600">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className=" text-sm"
                        icon={faBriefcase}
                      />{" "}
                    </span>
                    {profile?.bio}{" "}
                  </p>
                  <p className="text-sm mt-1  text-gray-600">
                    <span>
                      {" "}
                      <FontAwesomeIcon
                        className=" text-sm"
                        icon={faEnvelope}
                      />{" "}
                    </span>
                    {profile?.email}{" "}
                  </p>
                </div>
              </div>
              <button
                onClick={handleEditClick}
                className="update-profile p-2 px-3 rounded-lg bg-black text-white"
              >
                Edit Profile
              </button>
            </div>
            <div className="personal-information w-fit mt-3">
              <ul className="flex gap-7 border-b border-gray-400">
                <li className=" text-red-700 pb-3 border-b-2 border-red-600 font-semibold">
                  {" "}
                  <FontAwesomeIcon className="" icon={faUser} /> Personal
                  Information
                </li>
                <li className=" font-semibold">
                  {" "}
                  <FontAwesomeIcon className="" icon={faBriefcase} />{" "}
                  Professional Information{" "}
                </li>
                <li className=" font-semibold">
                  {" "}
                  <FontAwesomeIcon
                    className=""
                    icon={faFileLines}
                  /> Documents{" "}
                </li>
                <li className=" font-semibold">
                  {" "}
                  <FontAwesomeIcon className="" icon={faFingerprint} /> Account
                  Access{" "}
                </li>
              </ul>
              <div className="table-data mt-5 flex">
                <div className="w-1/2">
                  <p className="first-name-label font-semibold text-xs text-gray-500">
                    First Name
                  </p>
                  <p className="first-name text-sm font-medium mt-1">
                    {profile?.first_name}
                  </p>
                </div>{" "}
                <div className="w-1/2">
                  <p className="last-name-label font-semibold text-xs text-gray-500">
                    Last Name
                  </p>
                  <p className="last-name text-sm font-medium mt-1">
                    {" "}
                    {profile?.last_name}
                  </p>
                </div>
              </div>
              <div className="table-data mt-5 flex">
                <div className="w-1/2">
                  <p className="number-label font-semibold text-xs text-gray-500">
                    Mobile Number
                  </p>
                  <p className="number text-sm font-medium mt-1">
                    {profile?.phone}
                  </p>
                </div>{" "}
                <div className="w-1/2">
                  <p className="email-label font-semibold text-xs text-gray-500">
                    Email Address
                  </p>
                  <p className="email text-sm font-medium mt-1">
                    {profile?.email}{" "}
                  </p>
                </div>
              </div>
              <div className="table-data mt-5 flex">
                <div className="w-1/2">
                  <p className="date-label font-semibold text-xs text-gray-500">
                    Date of Birth
                  </p>
                  <p className="date text-sm font-medium mt-1">July 14, 1999</p>
                </div>{" "}
                <div className="w-1/2">
                  <p className="status-label font-semibold text-xs text-gray-500">
                    Martial Status
                  </p>
                  <p className="status text-sm font-medium mt-1">Single</p>
                </div>
              </div>{" "}
              <div className="table-data mt-5 flex">
                <div className="w-1/2">
                  <p className="gender-label font-semibold text-xs text-gray-500">
                    Gender
                  </p>
                  <p className="gender text-sm font-medium mt-1">Female</p>
                </div>{" "}
                <div className="w-1/2">
                  <p className="nationality-label font-semibold text-xs text-gray-500">
                    Nationality
                  </p>
                  <p className="nationality text-sm font-medium mt-1">Egypt</p>
                </div>
              </div>{" "}
              <div className="table-data mt-5 flex">
                <div className="w-1/2">
                  <p className="address-label font-semibold text-xs text-gray-500">
                    Address
                  </p>
                  <p className="address text-sm font-medium mt-1">Maadi</p>
                </div>{" "}
                <div className="w-1/2">
                  <p className="city-label font-semibold text-xs text-gray-500">
                    City
                  </p>
                  <p className="city text-sm font-medium mt-1">Cairo</p>
                </div>
              </div>
              <div className="table-data mt-5 flex">
                <div className="w-1/2">
                  <p className="state-label font-semibold text-xs text-gray-500">
                    State
                  </p>
                  <p className="state text-sm font-medium mt-1">Cairo</p>
                </div>{" "}
                <div className="w-1/2">
                  <p className="zip-code-label font-semibold text-xs text-gray-500">
                    Zip Code
                  </p>
                  <p className="zip-code text-sm font-medium mt-1">2569+</p>
                </div>
              </div>{" "}
              <div className="table-data  mt-3 flex">
                <div className="w-1/2">
                  <p className="works-hours-label font-semibold text-xs text-gray-500">
                    Works hours
                  </p>
                  <p className="works-hours text-sm font-medium mt-1">
                    180 hour
                  </p>
                </div>{" "}
                <div className="w-1/2 flex justify-between ">
                  <div className="salary">
                    <p className="salary-label font-semibold text-xs text-gray-500">
                      Salary/hour
                    </p>
                    <p className="salary text-sm font-medium mt-1">300 EGP</p>
                  </div>
                  <div className="total-salary">
                    <p className="total-label font-semibold text-xs text-red-600">
                      Total Salary
                    </p>
                    <p className="total text-sm font-medium mt-1">54000 EGP</p>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
