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
  any,
  any,
  { rejectValue: ErroResponseData }
>("user/GetAllInstitution", async (params: Record<string, any>, thunkAPI) => {
  try {
    const { page = 1, state, lga } = params;

    const filterParams = new URLSearchParams({ page: page.toString() });

    if (state) filterParams.append("state", state);
    if (lga) filterParams.append("local_government", lga);

    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.allInstitute}?${filterParams.toString()}`,
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

export const triggerSurveyIndicatorById = createAsyncThunk<
  any,
  { categoryId: string },
  { rejectValue: ErroResponseData }
>("user/GetSurveyIndicatorById", async (categoryId, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getSurveyIndicatorById}/${categoryId.categoryId}`,
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

export const triggerSurveyIndicatorQuestions = createAsyncThunk<
  DefaultResponse,
  { indicatorId: string },
  { rejectValue: ErroResponseData }
>("user/GetSurveyIndicatorQuestions", async (indicatorId, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.getSurveyIndicatorQuestions}/${indicatorId.indicatorId}/questions`,
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

export const triggerSubmitSurveyReport = createAsyncThunk<
  any,
  any,
  { rejectValue: any }
>("user/submitSurveyReport", async (surveyReportData, thunkAPI) => {
  try {
    const institution_id = localStorage.getItem("institutionIdentifier");
    const surveyQuestionIdentifier = localStorage.getItem(
      "surveyQuestionIdentifier",
    );
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${apiUrl.submitSurveyReport}/${institution_id}/questions/${surveyQuestionIdentifier}/`,
      surveyReportData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          // Accept: "application/json",
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

export const triggerSubmitSurveyReportMultiple = createAsyncThunk<
  any,
  any,
  { rejectValue: any }
>("user/submitSurveyReportMultiple", async (surveyReportData, thunkAPI) => {
  try {
    const institution_id = localStorage.getItem("institutionIdentifier");
    const surveyIndicatorIdentifier = localStorage.getItem(
      "surveyIndicatorIdentifier",
    );
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${apiUrl.submitSurveyReportMultiple}/${institution_id}/indicators/${surveyIndicatorIdentifier}/`,
      surveyReportData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
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

export const triggerGetNearbyInstitution = createAsyncThunk<
  DefaultResponse,
  any,
  { rejectValue: ErroResponseData }
>("user/GetNearbyInstitution", async (params, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get<DefaultResponse>(
      `${apiUrl.allInstitute}/?state=${params.state}&local_government=${params.lga}`,
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
