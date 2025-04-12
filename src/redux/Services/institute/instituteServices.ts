import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../../config";
import { DefaultResponse } from "../user/types";

interface ErroResponseData {
  message: string;
  status_code?: number;
  results?: Record<string, string[]>;
}

export const triggerGetAllInstitution = createAsyncThunk<
  DefaultResponse,
  any,
  { rejectValue: ErroResponseData }
>("user/GetAllInstitution", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.allInstitute}`,
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
      message: error.message ?? "Something went wrong",
      status_code: error.status_code,
      results: error.results, 
    });
  }
});

export const triggerGetInstitutionById = createAsyncThunk<
  DefaultResponse,
  string,
  { rejectValue: ErroResponseData }
>("user/GetInstitutionById", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getInstituteById}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    // console.log("GET INSTITUTION BY ID response********", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message ?? "Something went wrong",
      status_code: error.status_code,
      results: error.results,
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
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getAllCategories}`,
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
      message: error.message ?? "Something went wrong",
      status_code: error.status_code,
      results: error.results, 
    });
  }
});

export const triggerSurveyIndicatorById = createAsyncThunk<
  DefaultResponse,
  { categoryId: string },
  { rejectValue: ErroResponseData }
>("user/GetSurveyIndicatorById", async (categoryId, thunkAPI) => {
  try {
    console.log("Indicator Id", categoryId);
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getSurveyIndicatorById}/${categoryId.categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log("GET SURVEY INDICATOR BY ID respons>>>>>", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message ?? "Something went wrong",
      status_code: error.status_code,
      results: error.results, 
    });
  }
});

export const triggerSurveyIndicatorQuestions = createAsyncThunk<
  DefaultResponse,
  { indicatorId: string },
  { rejectValue: ErroResponseData }
>("user/GetSurveyIndicatorQuestions", async (indicatorId, thunkAPI) => {
  try {
    console.log("Indicator Id", indicatorId);
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getSurveyIndicatorQuestions}/${indicatorId.indicatorId}/questions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log("GET SURVEY INDICATOR QUESTIONS respons>>>>>", response.data.results);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.message ?? "Something went wrong",
      status_code: error.status_code,
      results: error.results, 
    });
  }
});