import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config";
import { DefaultResponse } from "../user/types";

interface ErroResponseData {
  message: string;
  status_code?: number;
  results?: Record<string, string[]>;
}

export const triggerGetUserProfile = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("settings/GetUserProfile", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getUserProfile}`,
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
});

export const triggerGetNotifications = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("settings/GetNotifications", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getNotifications}`,
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
});

export const triggerReadNotifications = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("settings/ReadNotifications", async (notification_id, thunkAPI) => {
  try {
    console.log("notification_id", notification_id);
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch<DefaultResponse>(
      `${apiUrl.readNotifications}`,
      notification_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message ?? "Something went wrong",
      status_code: error.response.data.status_code,
      results: error.response.data.results,
    });
  }
});

export const triggerChangePassword = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("settings/ChangePassword", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.put<DefaultResponse>(
      `${apiUrl.changePassword}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message ?? "Something went wrong",
      status_code: error.response.data.status_code,
      results: error.response.data.results,
    });
  }
});

export const triggerUpdateContactInfo = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("settings/UpdateContactInfo", async (payload, thunkAPI) => {
  try {
    console.log("I GOT TRIGGERED");
    console.log("payload", payload);
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch<DefaultResponse>(
      `${apiUrl.updateContactInfo}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    console.log("response", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response.data.message ?? "Something went wrong",
      status_code: error.response.data.status_code,
      results: error.response.data.results,
    });
  }
});

export const triggerGetLocation = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("settings/GetLocation", async (state_id, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getLocation}?state_id=${state_id}`,
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
});
