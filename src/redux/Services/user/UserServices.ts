import { LoginResponse } from "./../user/types";
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
  user_type: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const triggerUserSignup = createAsyncThunk<
  SignupResponse,
  SignupData,
  { rejectValue: string }
>("user/signup", async (signupData, thunkAPI) => {
  try {
    const response = await axios.post<SignupResponse>(
      apiUrl.signUp,
      signupData
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.data || error.response.statusText
      );
    } else if (error.request) {
      return thunkAPI.rejectWithValue("No response received from server");
    } else {
      return thunkAPI.rejectWithValue("Error setting up request");
    }
  }
});

export const triggerUserLogin = createAsyncThunk<
  LoginResponse,
  LoginData,
  { rejectValue: string }
>("user/login", async (LoginData, thunkAPI) => {
  try {
    const response = await axios.post<LoginResponse>(apiUrl.login, LoginData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data?.data || error.response.data?.data ||  error.response.statusText
      );
    } else if (error.request) {
      return thunkAPI.rejectWithValue("No response received from server");
    } else {
      return thunkAPI.rejectWithValue("Error setting up request");
    }
  }
});

export const triggerForgotPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ForgotPasswordData,
  { rejectValue: string }
>("user/forgotPassword", async (forgotPasswordData, thunkAPI) => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
      apiUrl.forgotPassword,
      forgotPasswordData
    );
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
  ForgotPasswordResponse,
  OTPRequestData,
  { rejectValue: string }
>("user/OTPRequest", async (OTPRequestData, thunkAPI) => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
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
  { rejectValue: string }
>("user/ValidateOTP", async (OTPData, thunkAPI) => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
      apiUrl.validateOtp,
      OTPData
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

export const triggerResetPassword = createAsyncThunk<
  ForgotPasswordResponse,
  ResetPasswordData,
  { rejectValue: string }
>("user/resetPassword", async (resetPasswordData, thunkAPI) => {
  try {
    const response = await axios.patch<ForgotPasswordResponse>(
      `${apiUrl.resetPassword}?email=${resetPasswordData.email}`,
      resetPasswordData
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
