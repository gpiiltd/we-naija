import { LoginResponse } from './../user/types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config";
import { SignupResponse } from "./types";

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
        error.response.data?.message || error.response.statusText
      );
    } else if (error.request) {
      return thunkAPI.rejectWithValue("No response received from server");
    } else {
      return thunkAPI.rejectWithValue("Error setting up request");
    }
  }
});

export const triggerUserLogin = createAsyncThunk<
LoginResponse,LoginData,
  { rejectValue: string }
>("user/login", async (LoginData, thunkAPI) => {
  try {
    const response = await axios.post<LoginResponse>(
      apiUrl.login,
      LoginData
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      
      return thunkAPI.rejectWithValue(
        error.response.data?.message || error.response.statusText
      );
    } else if (error.request) {
      return thunkAPI.rejectWithValue("No response received from server");
    } else {
      return thunkAPI.rejectWithValue("Error setting up request");
    }
  }
});