import { createSlice } from "@reduxjs/toolkit";
import { triggerGetUserProfile } from "./settingsServices";
interface IinitialState {
  userProfileData: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
}

const initialState: IinitialState = {
  userProfileData: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resetUserProfileState: (state) => {
      state.userProfileData.error = initialState.userProfileData.error;
      state.userProfileData.message = initialState.userProfileData.message;
      state.userProfileData.statusCode =
        initialState.userProfileData.statusCode;
    },
  },
  extraReducers: (builder) => {
    //GET USER PROFILE DATA
    builder.addCase(triggerGetUserProfile.pending, (state) => {
      state.userProfileData.loading = true;
      state.userProfileData.error = false;
      state.userProfileData.data = {};
      state.userProfileData.message = "";
    });
    builder.addCase(triggerGetUserProfile.fulfilled, (state, action) => {
      state.userProfileData.loading = false;
      state.userProfileData.data = action.payload?.data;
      state.userProfileData.error = false;
      state.userProfileData.message = action.payload
        ?.message as unknown as string;
      state.userProfileData.statusCode = action.payload
        ?.status_code as unknown as number;
    });
    builder.addCase(triggerGetUserProfile.rejected, (state, action) => {
      state.userProfileData.loading = false;
      state.userProfileData.error = true;
      state.userProfileData.message = action.payload
        ?.message as unknown as string;
      state.userProfileData.statusCode = action.payload?.status_code ?? null;
    });
  },
});

export const { resetUserProfileState } = settingsSlice.actions;

export default settingsSlice.reducer;
