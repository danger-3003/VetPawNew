"use client";

import React, { useEffect, useState } from "react";
import { handleGetUserProfile } from "@/services/user/handler";
import Button from "./ui/Button/AuthButton";
import Input from "./ui/Input";
import { Toaster } from "./ui/Toaster";
import { Loader } from "lucide-react";
import { handleNavigate } from "@/utils/Navigate";

function Profile() {
  const [alert, setAlert] = useState({ show: false, message: "", status: false });

  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    role: "",
    address: "",
    status: "",
  });

  // fetch profile
  useEffect(() => {
    handleGetUserProfile()
      .then((res) => {
        const userData = res.data.user;
        setPersonalData({
          ...personalData,
          firstName: userData.name,
          email: userData.email,
          mobile: userData.phone,
          role: userData.role,
          address: userData.address,
          status: userData.verified ? "Verified" : "Not Verified",
        });
      })
      .catch((err) => {
        setAlert({
          show: true,
          message: err?.response?.data?.message || "Error occurred",
          status: false,
        });
        setTimeout(() => {
          setAlert({
            show: false,
            status: false,
            message: "",
          });
        }, 1500);
      });
  }, []);

  return (
    <>
      <Toaster
        status={alert?.status}
        message={alert?.message}
        showToast={alert?.show}
      />
      <div className="flex items-center justify-center flex-col w-full pt-28 pb-20 px-5">
        <h2 className="text-red-500 dark:text-white text-3xl font-semibold sm:text-4xl md:text-5xl mb-10">
          User Profile
        </h2>
        <div className="shadow-lg p-5 rounded-lg bg-background dark:bg-zinc-800/20 text-sm w-full sm:w-max flex items-start justify-start flex-col">
          <div className="w-full flex items-center sm:items-start justify-center flex-col">
            <p className="text-orange-400 font-medium mb-3 text-base sm:text-lg">
              Personal Information
            </p>
            <div className="mt-3 flex flex-col gap-5 w-full">
              <div className="flex items-center justify-center gap-5 flex-col sm:flex-row">
                <div>
                  <Input
                    label="First Name"
                    type="text"
                    readOnly
                    value={personalData.firstName}
                    className="max-w-60 lg:max-w-80 w-[80vw] border-none"
                  />
                </div>
                <div>
                  <Input
                    label="User Role"
                    type="text"
                    readOnly
                    value={personalData.role}
                    className="max-w-60 lg:max-w-80 w-[80vw] border-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-5 flex-col sm:flex-row">
                <div>
                  <Input
                    label="Email"
                    type="text"
                    readOnly
                    value={personalData.email}
                    className="max-w-60 lg:max-w-80 w-[80vw] border-none"
                  />
                </div>
                <div>
                  <Input
                    label="Phone Number"
                    type="text"
                    readOnly
                    value={personalData.mobile}
                    className="max-w-60 lg:max-w-80 w-[80vw] border-none"
                  />
                </div>
              </div>
              <div className="flex items-center sm:items-start justify-center sm:justify-start w-full">
                <div className="flex flex-col items-start gap-1 max-w-60 lg:max-w-80 w-[80vw] border-none">
                  <label className="text-sm font-medium text-gray-700 dark:text-text">Password</label>
                  <p className="px-2">*********</p>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center sm:items-start justify-center flex-col">
              <p className="text-orange-400 font-medium mb-3 text-base sm:text-lg">
                Address
              </p>
              <div className="flex items-center justify-center gap-5 flex-col sm:flex-row">
                <div>
                  <Input
                    label="Address"
                    type="text"
                    readOnly
                    value={personalData.address}
                    className="max-w-60 lg:max-w-80 w-[80vw] border-none"
                  />
                </div>
                <div className="flex items-start justify-start flex-col max-w-60 lg:max-w-80 w-[80vw] border-none">
                  <p className="text-sm font-medium text-gray-700 dark:text-text mb-1">
                    Profile Status
                  </p>
                  <p className="bg-green-300 text-green-900 w-full rounded px-4 py-1 max-w-40 flex items-center justify-center">
                    {personalData.status ? personalData.status : <Loader width={16} className="animate-spin" />}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-5 flex-col sm:flex-row mt-3">
                <div className="flex items-start justify-start flex-col max-w-60 lg:max-w-80 w-[80vw] border-none">
                  <p className="text-sm font-medium text-gray-700 dark:text-text mb-1">
                    Forgot password
                  </p>
                  <Button onClick={() => { handleNavigate("reset-password") }} className="bg-red-400 text-white dark:text-background hover:bg-red-500 w-full rounded px-4 py-1 max-w-40 flex items-center justify-center">
                    click&nbsp;here
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
