import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config";
import { DefaultResponse } from "../user/types";

interface ErroResponseData {
  message: string;
  status_code?: number;
  results?: Record<string, string[]>;
}

export const triggerGetAllCommunityCategories = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("community/GetAllCommunityTasks", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getAllCommunityTaskCategories}`,
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

export const triggerGetCommunityTaskCategoryById = createAsyncThunk<
  DefaultResponse,
  string,
  { rejectValue: ErroResponseData }
>("community/GetCommunityTaskCategoryById", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getCommunityTaskCategoryById}/${id}`,
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

export const triggerGetAllIndicators = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("community/GetAllIndicators", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getAllIndicators}`,
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

export const triggerAnswerTaskQuestion = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("community/AnswerTaskQuestion", async (data, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post<DefaultResponse>(
      `${apiUrl.answerTaskQuestion}`,
      data,
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

export const triggerGetTaskQuestions = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("community/GetTaskQuestions", async (indicatorId, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getTaskQuestions}?indicator=${indicatorId}`,
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

export const triggerGetTaskQuestionById = createAsyncThunk<
  any,
  any,
  { rejectValue: ErroResponseData }
>("community/GetTaskQuestionById", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getTaskQuestions}/${id}`,
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
