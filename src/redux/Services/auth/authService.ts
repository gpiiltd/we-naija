import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config";
import {
  DefaultResponse,
  EmailVerificationData,
  ForgotPasswordData,
  OTPData,
  PhoneNumberVerificationData,
  ResetPasswordData,
} from "../user/types";

interface ErroResponseData {
  message: string;
  status_code?: number;
  results?: Record<string, string[]>;
}

export const triggerRequestForgotPasswordOtp = createAsyncThunk<
  any,
  OTPData,
  { rejectValue: ErroResponseData }
>("auth/ForgotPasswordOtp", async (payload, thunkAPI) => {
  try {
    const response = await axios.post<any>(apiUrl.forgotPasswordOtp, payload);
    console.log("responseOTP", response.data);

    const token = response.data?.access_credentials.token;
    console.log("otpToken", token);
    if (token) {
      localStorage.setItem("otpToken", token);
    }
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message ?? "Something went wrong",
      status_code: error.response.data.status_code,
      results: error.response.data.results,
    });
  }
});

export const triggerResetPassword = createAsyncThunk<
  any,
  ResetPasswordData,
  { rejectValue: ErroResponseData }
>("auth/ResetPassword", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("otpToken");
    const response = await axios.put<any>(apiUrl.resetPassword, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message ?? "Something went wrong",
      status_code: error.response.data.status_code,
      results: error.response.data.results,
    });
  }
});

export const triggerPhoneNumberVerificationResend = createAsyncThunk<
  DefaultResponse,
  PhoneNumberVerificationData,
  { rejectValue: ErroResponseData }
>(
  "auth/PhoneNumberVerificationResend",
  async (PhoneNumberVerificationData, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post<DefaultResponse>(
        `${apiUrl.phoneNumberVerification}`,
        PhoneNumberVerificationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        message: error.response.data.message ?? "Something went wrong",
        status_code: error.response.data.status_code,
        results: error.response.data.results,
      });
    }
  },
);

export const triggerEmailVerification = createAsyncThunk<
  DefaultResponse,
  EmailVerificationData,
  { rejectValue: ErroResponseData }
>("auth/EmailVerifications", async (EmailVerificationData, thunkAPI) => {
  try {
    console.log(" TRIGGERREFRESH");
    const { uid, email_token } = EmailVerificationData;
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.emailVerification}/${uid}/${email_token}`,
      //
      {
        headers: {
          "access-control-allow-origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Methods": "*",
        },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message ?? "Something went wrong",
      status_code: error.response.data.status_code,
      results: error.response.data.results,
    });
  }
});

export const triggerEmailLinkResend = createAsyncThunk<
  DefaultResponse,
  ForgotPasswordData,
  { rejectValue: ErroResponseData }
>("auth/EmailLinkResends", async (forgotPasswordData, thunkAPI) => {
  try {
    console.log("RESEND TRIGGERREFRESH");
    const response = await axios.post<DefaultResponse>(
      apiUrl.emailVerificationResend,
      forgotPasswordData,
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message ?? "Something went wrong",
      status_code: error.response.data.status_code,
      results: error.response.data.results,
    });
  }
});
