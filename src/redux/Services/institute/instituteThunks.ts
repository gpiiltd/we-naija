import { createAsyncThunk } from "@reduxjs/toolkit";
// import {  ListAllInstitute } from "./instituteServices";

// interface ErroResponseData {
//     message: string;
//     status_code?: number;
//     results?: Record<string, string[]>;
//   }

// export const triggerListAllInstitute = createAsyncThunk<
//   any,
//   Record<string, string>,
//   { rejectValue: ErroResponseData }
// >(
//   "institute/list_all_institute",
//   async (params, thunkAPI) => {
//     try {
//       return await ListAllInstitute.list_all_institute(params);
//     } catch (e: any) {
//       return thunkAPI.rejectWithValue({
//         message: e.message ?? "Something went wrong",
//         status_code: e.status_code,
//         results: e.results,
//       });
//     }
//   }
// );
