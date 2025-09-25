"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import { handleForgotPasswordApi, handleResetPasswordApi } from "@/services/auth/handler";
import { Loader } from "lucide-react";
import Button from "@/components/ui/Button/AuthButton";
import { Toaster } from "@/components/ui/Toaster";
import { handleNavigate } from "@/utils/Navigate";
import { clearAuthToken } from "@/services/api/instance";

interface AlertState {
  show: boolean;
  message: string;
  status: boolean; // true = success, false = error
}

export default function ForgotPasswordPage() {
  const [getOtp, setGetOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({ show: false, message: "", status: false });
  const [resetPassword, setResetPassword] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleGetOTP = async () => {
    setLoading(true);
    try {
      await handleForgotPasswordApi({ email: resetPassword.email });
      setGetOtp(true);
      setAlert({ show: true, message: "OTP sent to your email", status: true });
      setTimeout(() => {
        setAlert({
          show: false,
          status: true,
          message: "",
        });
      }, 2500);
    } catch (error: unknown) {
      let message = "Failed to send OTP";
      if (typeof error === "object" && error !== null && "response" in error) {
        const errObj = error as { response?: { data?: { error?: string } } };
        message = errObj.response?.data?.error || message;
      }
      setAlert({ show: true, message: message, status: false });
      setTimeout(() => {
        setAlert({
          show: false,
          status: false,
          message: "",
        });
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await handleResetPasswordApi(resetPassword);
      setAlert({ show: true, message: response.data.message, status: true });
      setResetPassword({ email: "", otp: "", newPassword: "" });
      setGetOtp(false);
      setTimeout(() => {
        setAlert({
          show: false,
          status: true,
          message: "",
        });
        clearAuthToken();
        handleNavigate("auth");
      }, 2500);
    } catch (error: unknown) {
      let message = "Failed to reset password";
      if (typeof error === "object" && error !== null && "response" in error) {
        const errObj = error as { response?: { data?: { message?: string } } };
        message = errObj.response?.data?.message || message;
      }
      setAlert({ show: true, message: message, status: false });
      setTimeout(() => {
        setAlert({
          show: false,
          status: false,
          message: "",
        });
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-zinc-900 shadow-text/20 w-full max-w-sm md:max-w-md">
        <h1 className="text-red-500 dark:text-white text-3xl font-semibold sm:text-4xl md:text-5xl mb-10 text-center">
          {getOtp ? "Reset Password" : "Forgot Password"}
        </h1>
        <Toaster
          message={alert?.message}
          showToast={alert?.show}
          status={alert?.status}
        />

        <form
          onSubmit={getOtp ? handleResetPassword : (e) => { e.preventDefault(); handleGetOTP(); }}
          className="flex flex-col gap-4 items-center"
        >
          {/* Email */}
          <Input
            className="w-full"
            label="User Email"
            type="email"
            required
            value={resetPassword.email}
            onChange={(e) => setResetPassword({ ...resetPassword, email: e.target.value })}
          />

          {getOtp && (
            <>
              <Input
                className="w-full"
                label="OTP"
                type="text"
                required
                value={resetPassword.otp}
                onChange={(e) => setResetPassword({ ...resetPassword, otp: e.target.value })}
              />

              <Input
                className="w-full"
                label="New Password"
                type="password"
                required
                value={resetPassword.newPassword}
                onChange={(e) => setResetPassword({ ...resetPassword, newPassword: e.target.value })}
              />
            </>
          )}

          <Button type="submit" className="w-32 flex items-center justify-center">
            {loading ? <Loader width={16} className="animate-spin" /> : getOtp ? "Reset" : "Get OTP"}
          </Button>
        </form>

        {getOtp && (
          <button
            onClick={() => {
              setGetOtp(false);
              setResetPassword({ ...resetPassword, otp: "", newPassword: "" });
            }}
            className="mt-4 text-sm text-text hover:underline font-poppins"
          >
            Didn’t receive OTP? Try again&nbsp;
          </button>
        )}

        <button
          onClick={() => {
            handleNavigate("auth")
            setGetOtp(false);
            setResetPassword({ email: "", otp: "", newPassword: "" });
          }}
          className="mt-4 text-sm text-orange-600 dark:text-orange-400 hover:underline font-poppins"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}