import { createSlice } from "@reduxjs/toolkit";
import {
  triggerGetNotifications,
  triggerGetUserProfile,
} from "./settingsServices";
interface IinitialState {
  userProfileData: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  notificationsData: {
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
  notificationsData: {
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

    //GET NOTIFICATIONS DATA
    builder.addCase(triggerGetNotifications.pending, (state) => {
      state.notificationsData.loading = true;
      state.notificationsData.error = false;
      state.notificationsData.data = {};
      state.notificationsData.message = "";
    });
    builder.addCase(triggerGetNotifications.fulfilled, (state, action) => {
      console.log("action", action.payload);
      state.notificationsData.loading = false;
      state.notificationsData.data = action.payload?.results;
      state.notificationsData.error = false;
      state.notificationsData.message = action.payload
        ?.message as unknown as string;
      state.notificationsData.statusCode = action.payload?.status_code ?? null;
    });
  },
});

export const { resetUserProfileState } = settingsSlice.actions;

export default settingsSlice.reducer;
