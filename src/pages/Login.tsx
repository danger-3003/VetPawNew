/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { handleLoginApi, handleSignUpApi } from "@/services/auth/handler";
import Button from "@/components/ui/Button/AuthButton";
import Input from "@/components/ui/Input";
import { Toaster } from "@/components/ui/Toaster";
import Select from "@/components/ui/SelectOption";
import { Loader } from "lucide-react";
import { handleNavigate } from "@/utils/Navigate";
import { userStore } from "@/store/UserStore";

function Authentication() {
  const [screen, setScreen] = useState<"login" | "signin">("login");
  const [alert, setAlert] = useState<{ show: boolean; message: string; status: boolean }>({
    show: false,
    message: "",
    status: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "retailer" as "doctor" | "stockist" | "retailer",
    proofOfRole: "",
    gstNo: "",
  });
  const { addUser } = userStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await handleLoginApi(loginData);

      if (response.status === 200) {
        setCookie("token", response?.data?.token, { maxAge: 60 * 60 * 24 * 94 });
        setAlert({ show: true, status: true, message: response?.data?.message });
        addUser(response?.data?.user);
        handleNavigate("");
      }
    } catch (error: unknown) {
      console.log(error);
      let message = "Login failed";
      if (typeof error === "object" && error !== null && "response" in error) {
        const errObj = error as { response?: { data?: { message?: string } } };
        message = errObj.response?.data?.message || message;
      }
      setAlert({
        show: true,
        status: false,
        message,
      });
    }
    setLoading(false);
    setTimeout(() => {
      setAlert({
        show: false,
        status: false,
        message: "",
      });
    }, 3000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await handleSignUpApi(signUpData);

      if (response.status === 200) {
        setScreen("login");
        setAlert({
          show: true,
          status: true,
          message: "User created. Please wait until ADMIN accepts your request",
        });
      }
    } catch (error: unknown) {
      console.log(error);
      let message = "Signup failed";
      if (typeof error === "object" && error !== null && "response" in error) {
        const errObj = error as { response?: { data?: { error?: string } } };
        message = errObj.response?.data?.error || message;
      }
      setAlert({
        show: true,
        status: false,
        message,
      });
    }
    setLoading(false);
    setTimeout(() => {
      setAlert({
        show: false,
        status: false,
        message: "",
      });
    }, 3000);
  };


  return (
    <>
      <div className="w-full relative flex items-center justify-center flex-col bg-background px-5">
        {/* Banner */}
        <div
          className="h-80 w-full flex items-center justify-center flex-col text-white font-poppins font-semibold text-3xl md:text-4xl lg:text-5xl"
          style={{
            background: `linear-gradient(to left,rgba(0,0,0,0.8),rgba(0,0,0,0.6),rgba(0,0,0,0.8)),url(${"/Auth/Bg.jpg"})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <span>Authentication</span>
          <span className="mt-3 text-xl font-extralight">(Login/ SignUp)</span>
        </div>

        {/* Card */}
        <div className="relative flex items-center justify-start flex-col w-full sm:w-auto py-5 pb-10 px-5 sm:px-7 md:px-10 my-10 mx-5 dark:bg-zinc-900 rounded-lg shadow-lg shadow-black/20">
          <Toaster
            status={alert?.status}
            message={alert?.message}
            showToast={alert?.show}
          />

          <div>
            <img src="/Logo.jpg" alt="VetPaw Logo" className="h-20 mb-5" />
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center flex-row gap-3 xs:gap-5">
            <div
              className={`w-24 sm:w-28 py-1 text-center cursor-pointer border-orange-400 border-b-2 ${screen === "login" ? "bg-orange-400 text-white rounded" : "text-text"
                }`}
              onClick={() => setScreen("login")}
            >
              <p className="text-sm">Login</p>
            </div>
            <div
              className={`w-24 sm:w-28 py-1 text-center cursor-pointer border-orange-400 border-b-2 ${screen === "signin" ? "bg-orange-400 text-white rounded" : "text-text"
                }`}
              onClick={() => setScreen("signin")}
            >
              <p className="text-sm">Sign Up</p>
            </div>
          </div>

          {/* Login Form */}
          {screen === "login" && (
            <form onSubmit={handleLogin} className="flex items-center justify-center flex-col gap-5 py-10">
              <Input
                className="max-w-60 lg:max-w-80 w-[80vw]"
                label="User Email"
                type="email"
                required
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              <Input
                className="max-w-60 lg:max-w-80 w-[80vw]"
                label="Password"
                type="password"
                required
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <div className="w-full flex items-end justify-end text-sm">
                <p className="cursor-pointer hover:underline text-text" onClick={() => { handleNavigate("reset-password") }}>Forgot password?</p>
              </div>
              <Button type="submit" className="w-28 flex items-center justify-center">
                {
                  loading ?
                    <>
                      <Loader width={16} className="animate-spin" />
                    </> :
                    "Login"
                }
              </Button>
            </form>
          )}

          {/* Sign Up Form */}
          {screen === "signin" && (
            <form onSubmit={handleSignUp} className="flex items-center justify-center flex-col gap-5 pt-10">
              <div className="flex items-center justify-center gap-5 flex-col sm:flex-row">
                <Input
                  className="max-w-60 lg:max-w-80 w-[80vw]"
                  label="User Name"
                  type="text"
                  required
                  onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                />
                <Input
                  className="max-w-60 lg:max-w-80 w-[80vw]"
                  label="User Email"
                  type="email"
                  required
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-center gap-5 flex-col sm:flex-row">
                <Input
                  className="max-w-60 lg:max-w-80 w-[80vw]"
                  label="Password"
                  type="password"
                  required
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                />
                <Input
                  className="max-w-60 lg:max-w-80 w-[80vw]"
                  label="Phone Number"
                  type="tel"
                  required
                  onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-center gap-5 flex-col sm:flex-row">
                <Input
                  className="max-w-60 lg:max-w-80 w-[80vw]"
                  label="Address"
                  type="text"
                  onChange={(e) => setSignUpData({ ...signUpData, address: e.target.value })}
                />
                <Input
                  className="max-w-60 lg:max-w-80 w-[80vw]"
                  label="GST Number"
                  type="text"
                  onChange={(e) => setSignUpData({ ...signUpData, gstNo: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-center gap-5 flex-col sm:flex-row">
                <Input
                  className="max-w-60 lg:max-w-80 w-[80vw]"
                  label="Proof of Role"
                  type="file"
                  required
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64String = (event.target?.result as string).split(",")[1];
                        setSignUpData({ ...signUpData, proofOfRole: base64String });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Select
                  label="User Role"
                  required
                  className="max-w-60 lg:max-w-80 w-[80vw]"
                  value={signUpData.role}
                  onChange={(e) => setSignUpData({ ...signUpData, role: e.target.value as "doctor" | "stockist" | "retailer" })}
                  options={[
                    { value: "doctor", label: "Doctor" },
                    { value: "stockist", label: "Stockist" },
                    { value: "retailer", label: "Retailer" },
                  ]}
                />
              </div>
              <Button type="submit" className="w-28 flex items-center justify-center">
                {
                  loading ?
                    <>
                      <Loader width={16} className="animate-spin" />
                    </> :
                    "Signup"
                }
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Authentication;
