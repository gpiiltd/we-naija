import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config";
import { ForgotPasswordData, ForgotPasswordResponse, SignupResponse } from "./types";

interface SignupData {
  email: string;
  full_name: string;
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
    if (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    } else {
      throw error;
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
      error.response?.message || error.response?.data || "Failed to send forgot password email"
    );
  }
});
