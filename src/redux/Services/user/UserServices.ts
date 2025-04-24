import {
  DefaultResponse,
  EmailVerificationData,
  PhoneNumberVerificationData,
} from "./../user/types";
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
interface ErroResponseData {
  message: string;
  status_code?: number;
  results?: Record<string, string[]>;
}

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      "http://ec2-44-196-252-114.compute-1.amazonaws.com/api/v1/common/file-upload",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Add token to the header
        },
      }
    );

    if (!response.ok) {
      throw new Error("File upload failed");
    }
    const data = await response.json();
    return data.results.file_name;
    // return data.results.file_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return "";
  }
};

export const triggerUserSignup = createAsyncThunk<SignupResponse, SignupData, { rejectValue: any }>(
  "user/signup",
  async (signupData, thunkAPI) => {
    try {
      const response = await axios.post<SignupResponse>(apiUrl.signUp, signupData);
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
  }
);

export const triggerUserLogin = createAsyncThunk<any, LoginData, { rejectValue: any }>(
  "user/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post(apiUrl.login, loginData);
      localStorage.setItem("accessToken", response?.data?.data?.access_credentials?.access_token);
      localStorage.setItem("refreshToken", response?.data?.data?.access_credentials?.refresh_token);
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
  }
);

export const triggerForgotPassword = createAsyncThunk<
  DefaultResponse,
  ForgotPasswordData,
  { rejectValue: string }
>("user/forgotPassword", async (forgotPasswordData, thunkAPI) => {
  try {
    const response = await axios.post<DefaultResponse>(apiUrl.forgotPassword, forgotPasswordData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.message || error.response?.data || "Failed to send forgot password email"
    );
  }
});

export const triggerOTPRequest = createAsyncThunk<
  DefaultResponse,
  OTPRequestData,
  { rejectValue: string }
>("user/OTPRequest", async (OTPRequestData, thunkAPI) => {
  try {
    const response = await axios.post<DefaultResponse>(apiUrl.requestOtp, OTPRequestData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.message || error.response?.data || "Failed to validate OTP"
    );
  }
});

export const triggerOTPValidation = createAsyncThunk<
  ForgotPasswordResponse,
  OTPData,
  { rejectValue: any }
>("user/ValidateOTP", async (otpData, thunkAPI) => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(apiUrl.validateOtp, otpData);
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
    const response = await axios.post<DefaultResponse>(apiUrl.forgotPasswordOtp, otpData);

    const token = response.data.results?.access_credentials.token;
    if (token) {
      localStorage.setItem("otpToken", token);
    }
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
    const response = await axios.put<DefaultResponse>(
      `${apiUrl.resetPassword}`,
      resetPasswordData,
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
      error.response?.message || error.response?.data || "Failed to reset password"
    );
  }
});

export const triggerEmailVerificationResend = createAsyncThunk<
  DefaultResponse,
  ForgotPasswordData,
  { rejectValue: string }
>("user/EmailVerificationResend", async (forgotPasswordData, thunkAPI) => {
  try {
    const response = await axios.post<DefaultResponse>(
      apiUrl.emailVerificationResend,
      forgotPasswordData
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.message || error.response?.data || "Failed to resend email verification link"
    );
  }
});

export const triggerEmailVerification = createAsyncThunk<
  DefaultResponse,
  EmailVerificationData,
  { rejectValue: string }
>("user/EmailVerification", async (EmailVerificationData, thunkAPI) => {
  try {
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
      }
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.message || error.response?.data || "Failed to resend email verification link"
    );
  }
});

export const triggerPhoneNumberVerification = createAsyncThunk<
  DefaultResponse,
  PhoneNumberVerificationData,
  { rejectValue: ErroResponseData }
>("user/PhoneNumberVerification", async (PhoneNumberVerificationData, thunkAPI) => {
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
      }
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

export const triggerPhoneNumberVerificationOtp = createAsyncThunk<
  DefaultResponse,
  PhoneNumberVerificationData,
  { rejectValue: ErroResponseData }
>("user/PhoneNumberVerificationOtp", async (PhoneNumberVerificationData, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post<DefaultResponse>(
      `${apiUrl.phoneNumberVerificationOtp}`,
      PhoneNumberVerificationData,
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
    return thunkAPI.rejectWithValue({
      message: error.response.data.message ?? "Something went wrong",
      status_code: error.response.data.status_code,
      results: error.response.data.results,
    });
  }
});

export const triggerKycInfoSubmit = createAsyncThunk<
  DefaultResponse,
  any,
  { rejectValue: ErroResponseData }
>("user/KycInfoSubmit", async (KycInfoSubmitData, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post<DefaultResponse>(
      `${apiUrl.kycInfoSubmit}`,
      KycInfoSubmitData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",

          // Accept: "application/json",
        },
      }
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

export const triggerGetAllInstitute = createAsyncThunk<
  DefaultResponse,
  any,
  { rejectValue: ErroResponseData }
>("user/GetAllInstitute", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(`${apiUrl.allInstitute}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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

export const triggerGetInstituteById = createAsyncThunk<
  DefaultResponse,
  string,
  { rejectValue: ErroResponseData }
>("user/GetInstituteById", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(`${apiUrl.getInstituteById}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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

export const triggerGetAllSurveyCategories = createAsyncThunk<
  DefaultResponse,
  any,
  { rejectValue: ErroResponseData }
>("user/GetAllSurveyCategories", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(`${apiUrl.getAllCategories}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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
