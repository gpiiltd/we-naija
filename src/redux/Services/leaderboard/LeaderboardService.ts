import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config";
import { DefaultResponse } from "../user/types";

interface ErroResponseData {
  message: string;
  status_code?: number;
  results?: Record<string, string[]>;
}

export const triggerGetAllLeaderboardData = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("leaderboard/GetAllLeaderboardData", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getAllLeaderboardData}?timeframe=${payload.timeframe}&page=${payload.page}`,
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

export const triggerGetAllLeaderboardDataPublic = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("leaderboard/public", async (payload, thunkAPI) => {
  try {
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getAllLeaderboardDataPublic}?timeframe=${payload.timeframe}&page=${payload.page}`,
      {
        headers: {
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

export const triggerGetAllCompletedTaskData = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("leaderboard/GetAllCompletedTaskData", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getAllCompletedTask}`,
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

export const triggerGetAllCompletedSurveyData = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("leaderboard/GetAllCompletedSurveyData", async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getAllCompletedSurvey}`,
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
