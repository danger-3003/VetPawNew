import { ForgotPasswordPayload, LoginPayload, ResetPasswordPayload, SignUpPayload } from "@/components/types/ApiTypes";
import api from "../api/instance";
import { AUTH_API } from "../api/urls";

export const handleLoginApi = async (payload: LoginPayload) => {
  const response = await api.post(AUTH_API.LOGIN, payload);
  return response;
};

export const handleSignUpApi = async (payload: SignUpPayload) => {
  const response = await api.post(AUTH_API.SIGNUP, payload);
  return response;
};

export const handleForgotPasswordApi = async (payload: ForgotPasswordPayload) => {
  const response = await api.post(AUTH_API.FORGOT_PASSWORD, payload);
  return response;
};

export const handleResetPasswordApi = async (payload: ResetPasswordPayload) => {
  const response = await api.post(AUTH_API.RESET_PASSWORD, payload);
  return response;
};