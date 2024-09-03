"use client";

import React, { useState } from "react";
import Image from "next/image";
import "../../fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Sidebar from "./Components/Sidebar";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "https://cyparta-backend-gf7qm.ondigitalocean.app/api/login/",
        values
      );
      const { access, refresh } = response.data;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      console.log("Login Successful", response.data);
      // window.location.href = "/profile";
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuVisible(!isSubMenuVisible);
    setActiveItem("employees");
  };

  return (
    <div className="login flex  w-full h-screen ">
      <div className="log  w-full flex">
        <div className="1 w-1/5 ">
          <Sidebar></Sidebar>
        </div>
        <div className="2 w-4/5 flex flex-col items-center justify-center">
          <Image src="./logo.png" alt="Logo" width={180} height={80} />
          <div className="login-form rounded-lg lg:w-1/3 w-1/2 h-1/2 mt-11 py-10 px-6 border border-gray-400 lg:mx-auto">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                await handleLogin(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  <div className="email">
                    <label className="text-sm font-medium">Email Address</label>
                    <Field
                      className="w-full mt-3 bg-transparent border border-gray-400 h-10 p-3 text-sm rounded-lg"
                      type="email"
                      name="email"
                      placeholder="nouran@gmail.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-sm text-red-800 p-2 bg-red-200 rounded-lg mt-2"
                    />
                  </div>

                  <div className="pass mt-5">
                    <label className="text-sm mb-2 block font-medium">
                      Password
                    </label>

                    <div className="relative">
                      <Field
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        id="password"
                        className="w-full bg-transparent border border-gray-400 h-10 p-3 text-sm rounded-lg focus:border-teal-500 placeholder-gray-400"
                        placeholder="***********"
                      />
                      <div
                        className="cursor-pointer absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <FontAwesomeIcon
                            className="text-gray-500"
                            icon={faEye}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="text-gray-500"
                            icon={faEyeSlash}
                          />
                        )}
                      </div>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-sm text-red-800 p-2 bg-red-200 rounded-lg mt-2"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-sm text-red-800 p-2 bg-red-200 rounded-lg mt-2">
                      {errorMessage}
                    </p>
                  )}
                  <Link href={"/profile"}>
                    <button
                      type="submit"
                      disabled={!dirty || !isValid || isSubmitting}
                      className={`block mt-6 w-5/6 mx-auto py-2 text-sm text-center text-white rounded-lg ${
                        !dirty || !isValid || isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black"
                      }`}
                    >
                      Login
                    </button>
                  </Link>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
