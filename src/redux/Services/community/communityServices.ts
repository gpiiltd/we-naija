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
      }
    );
    console.log("response in SERVICE>>>", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message ?? "Something went wrong",
      status_code: error.status_code,
      results: error.results,
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
      }
    );
    console.log("GET COMMUNITY TASK CATEGORY BY ID in SERVICE>>>", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message ?? "Something went wrong",
      status_code: error.status_code,
      results: error.results,
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
      }
    );
    // console.log("GetAllIndicators in SERVICE>>>", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message ?? "Something went wrong",
      status_code: error.status_code,
      results: error.results,
    });
  }
});
