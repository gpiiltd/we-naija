import { DefaultResponse } from "./../user/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config";
import {
  ForgotPasswordData,
  ForgotPasswordResponse,
  OTPData,
  OTPRequestData,
  ResetPasswordData,
  SignupResponse,
} from "./types";

interface SignupData {
  email: string;
  full_name: string;
  password: string;
  confirm_password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const triggerUserSignup = createAsyncThunk<
  SignupResponse,
  SignupData,
  { rejectValue: any }
>("user/signup", async (signupData, thunkAPI) => {
  try {
    const response = await axios.post<SignupResponse>(
      apiUrl.signUp,
      signupData
    );
    console.log("response>>>>>>", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    } else if (error.request) {
      return thunkAPI.rejectWithValue({
        code: null,
        data: "No response received from server",
      });
    } else {
      return thunkAPI.rejectWithValue({
        code: null,
        data: "Error setting up request",
      });
    }
  }
});

export const triggerUserLogin = createAsyncThunk<
  any,
  LoginData,
  { rejectValue: any }
>("user/login", async (loginData, thunkAPI) => {
  try {
    const response = await axios.post(apiUrl.login, loginData);
    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.results?.access_credentials.access_token)
    );
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(response.data.results?.access_credentials.refresh_token)
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    } else if (error.request) {
      return thunkAPI.rejectWithValue({
        code: null,
        data: "No response received from server",
      });
    } else {
      return thunkAPI.rejectWithValue({
        code: null,
        data: "Error setting up request",
      });
    }
  }
});

export const triggerForgotPassword = createAsyncThunk<
  DefaultResponse,
  ForgotPasswordData,
  { rejectValue: string }
>("user/forgotPassword", async (forgotPasswordData, thunkAPI) => {
  try {
    const response = await axios.post<DefaultResponse>(
      apiUrl.forgotPassword,
      forgotPasswordData
    );
    console.log("FORGOT PASSWORD response>>>>>>", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.message ||
        error.response?.data ||
        "Failed to send forgot password email"
    );
  }
});

export const triggerOTPRequest = createAsyncThunk<
  DefaultResponse,
  OTPRequestData,
  { rejectValue: string }
>("user/OTPRequest", async (OTPRequestData, thunkAPI) => {
  try {
    const response = await axios.post<DefaultResponse>(
      apiUrl.requestOtp,
      OTPRequestData
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.message ||
        error.response?.data ||
        "Failed to validate OTP"
    );
  }
});

export const triggerOTPValidation = createAsyncThunk<
  ForgotPasswordResponse,
  OTPData,
  { rejectValue: any }
>("user/ValidateOTP", async (otpData, thunkAPI) => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
      apiUrl.validateOtp,
      otpData
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    } else if (error.request) {
      return thunkAPI.rejectWithValue({
        code: null,
        data: "No response received from server",
      });
    } else {
      return thunkAPI.rejectWithValue({
        code: null,
        data: "Error setting up request",
      });
    }
  }
});

export const triggerForgotPasswordOtp = createAsyncThunk<
  DefaultResponse,
  OTPData,
  { rejectValue: any }
>("user/ForgotPasswordOtp", async (otpData, thunkAPI) => {
  try {
    const response = await axios.post<DefaultResponse>(
      apiUrl.forgotPasswordOtp,
      otpData
    );
    localStorage.setItem(
      "otpToken",
      JSON.stringify(response.data.results?.access_credentials.token)
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    } else if (error.request) {
      return thunkAPI.rejectWithValue({
        code: null,
        data: "No response received from server",
      });
    } else {
      return thunkAPI.rejectWithValue({
        code: null,
        data: "Error setting up request",
      });
    }
  }
});

export const triggerResetPassword = createAsyncThunk<
  DefaultResponse,
  ResetPasswordData,
  { rejectValue: string }
>("user/resetPassword", async (resetPasswordData, thunkAPI) => {
  try {
    const token = localStorage.getItem("otpToken");
    console.log("token>>>>>>", token);
    const response = await axios.put<DefaultResponse>(
      `${apiUrl.resetPassword}`,
      resetPasswordData,
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.message ||
        error.response?.data ||
        "Failed to reset password"
    );
  }
});
