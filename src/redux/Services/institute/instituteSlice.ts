import { createSlice } from "@reduxjs/toolkit";
import { triggerListAllInstitute } from "./instituteThunks";

interface IinitialState {
  error: boolean;
  loading: boolean;
  userData: Record<string, any>[] | Record<string, any> | null;
  message: string;
  statusCode?: number | null;
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: null,
  message: "",
  statusCode: null,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.statusCode = initialState.statusCode;
    },
  },
  extraReducers: (builder) => {
    //LIST ALL ADMIN
    builder.addCase(triggerListAllInstitute.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = "";
    });
    builder.addCase(triggerListAllInstitute.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload?.results!;
      state.error = false;
      state.message = action.payload?.message as unknown as string;
      state.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerListAllInstitute.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload?.message as unknown as string;
      state.statusCode = action.payload?.status_code ?? null;
    });
  },
});

export const { resetState } = instituteSlice.actions;

export default instituteSlice.reducer;
