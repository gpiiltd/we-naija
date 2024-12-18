import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config";
import { SignupResponse } from "./types";

interface SignupData {
  email: string;
  full_name: string;
  password: string;
}

export const triggerUserSignup = createAsyncThunk<
  SignupResponse,        
  SignupData,            
  { rejectValue: string } 
>(
  'user/signup', 
  async (signupData, thunkAPI) => {
    try {
      const response = await axios.post<SignupResponse>(
        "https://nssf-backend-b65295a32eec.herokuapp.com/api/auth/signup",
        signupData 
      );
      console.log('response', response)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);
