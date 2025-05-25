import { createSlice } from "@reduxjs/toolkit";
import {
  triggerChangePassword,
  triggerGetLocation,
  triggerGetNotifications,
  triggerGetUserProfile,
  triggerKycInfoUpdate,
  triggerReadNotifications,
  triggerUpdateContactInfo,
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
  readNotifications: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  changePassword: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  updateContactInfo: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  locationData: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  updateKyc: {
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
  readNotifications: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  changePassword: {
    data: {},
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  updateContactInfo: {
    data: {},
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  locationData: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  updateKyc: {
    data: {},
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
    resetChangePasswordState: (state) => {
      state.changePassword.error = initialState.changePassword.error;
      state.changePassword.message = initialState.changePassword.message;
      state.changePassword.statusCode = initialState.changePassword.statusCode;
    },
    resetUpdateContactInfoState: (state) => {
      state.updateContactInfo.error = initialState.updateContactInfo.error;
      state.updateContactInfo.message = initialState.updateContactInfo.message;
      state.updateContactInfo.statusCode =
        initialState.updateContactInfo.statusCode;
    },
    resetLocationDataState: (state) => {
      state.locationData.error = initialState.locationData.error;
      state.locationData.message = initialState.locationData.message;
      state.locationData.statusCode = initialState.locationData.statusCode;
    },
    resetUpdateKycState: (state) => {
      state.updateKyc.error = initialState.updateKyc.error;
      state.updateKyc.message = initialState.updateKyc.message;
      state.updateKyc.statusCode = initialState.updateKyc.statusCode;
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
    builder.addCase(triggerGetNotifications.rejected, (state, action) => {
      state.notificationsData.loading = false;
      state.notificationsData.error = true;
      state.notificationsData.message = action.payload
        ?.message as unknown as string;
      state.notificationsData.statusCode = action.payload?.status_code ?? null;
    });

    //READ NOTIFICATIONS DATA
    builder.addCase(triggerReadNotifications.pending, (state) => {
      state.readNotifications.loading = true;
      state.readNotifications.error = false;
      state.readNotifications.data = {};
      state.readNotifications.message = "";
    });
    builder.addCase(triggerReadNotifications.fulfilled, (state, action) => {
      state.readNotifications.loading = false;
      state.readNotifications.data = action.payload?.results;
      state.readNotifications.error = false;
      state.readNotifications.message = action.payload
        ?.message as unknown as string;
      state.readNotifications.statusCode = action.payload?.status_code ?? null;
    });
    builder.addCase(triggerReadNotifications.rejected, (state, action) => {
      state.readNotifications.loading = false;
      state.readNotifications.error = true;
      state.readNotifications.message = action.payload
        ?.message as unknown as string;
      state.readNotifications.statusCode = action.payload?.status_code ?? null;
    });

    //CHANGE PASSWORD
    builder.addCase(triggerChangePassword.pending, (state) => {
      state.changePassword.loading = true;
      state.changePassword.error = false;
      state.changePassword.data = {};
      state.changePassword.message = "";
    });
    builder.addCase(triggerChangePassword.fulfilled, (state, action) => {
      console.log("action", action.payload);
      state.changePassword.loading = false;
      state.changePassword.data = action.payload?.results;
      state.changePassword.error = false;
      state.changePassword.message = action.payload
        ?.message as unknown as string;
      state.changePassword.statusCode = action.payload?.status_code ?? null;
    });
    builder.addCase(triggerChangePassword.rejected, (state, action) => {
      console.log("action rejected", action.payload);
      state.changePassword.loading = false;
      state.changePassword.error = true;
      state.changePassword.message = action.payload
        ?.message as unknown as string;
      state.changePassword.statusCode = action.payload?.status_code ?? null;
    });

    //UPDATE CONTACT INFO
    builder.addCase(triggerUpdateContactInfo.pending, (state) => {
      state.updateContactInfo.loading = true;
      state.updateContactInfo.error = false;
      state.updateContactInfo.data = {};
    });
    builder.addCase(triggerUpdateContactInfo.fulfilled, (state, action) => {
      state.updateContactInfo.loading = false;
      state.updateContactInfo.data = action.payload?.results;
      state.updateContactInfo.error = false;
      state.updateContactInfo.message = action.payload?.message ?? "";
      state.updateContactInfo.statusCode = action.payload?.status_code ?? null;
    });
    builder.addCase(triggerUpdateContactInfo.rejected, (state, action) => {
      state.updateContactInfo.loading = false;
      state.updateContactInfo.error = true;
      state.updateContactInfo.message = action.payload?.message ?? "";
      state.updateContactInfo.statusCode = action.payload?.status_code ?? null;
    });

    //GET LOCATION DATA
    builder.addCase(triggerGetLocation.pending, (state) => {
      state.locationData.loading = true;
      state.locationData.error = false;
      state.locationData.data = {};
      state.locationData.message = "";
    });
    builder.addCase(triggerGetLocation.fulfilled, (state, action) => {
      state.locationData.loading = false;
      state.locationData.data = action.payload?.results;
      state.locationData.error = false;
      state.locationData.message = action.payload?.message ?? "";
      state.locationData.statusCode = action.payload?.status_code ?? null;
    });
    builder.addCase(triggerGetLocation.rejected, (state, action) => {
      state.locationData.loading = false;
      state.locationData.error = true;
      state.locationData.message = action.payload?.message ?? "";
      state.locationData.statusCode = action.payload?.status_code ?? null;
    });

    //UPDATE KYC
    builder.addCase(triggerKycInfoUpdate.pending, (state) => {
      state.updateKyc.loading = true;
      state.updateKyc.error = false;
      state.updateKyc.data = {};
      state.updateKyc.message = "";
    });
    builder.addCase(triggerKycInfoUpdate.fulfilled, (state, action) => {
      state.updateKyc.loading = false;
      state.updateKyc.data = action.payload?.results;
      state.updateKyc.error = false;
      state.updateKyc.message = action.payload?.message ?? "";
      state.updateKyc.statusCode = action.payload?.status_code ?? null;
    });
    builder.addCase(triggerKycInfoUpdate.rejected, (state, action) => {
      state.updateKyc.loading = false;
      state.updateKyc.error = true;
      state.updateKyc.message = action.payload?.message ?? "";
      state.updateKyc.statusCode = action.payload?.status_code ?? null;
    });
  },
});

export const {
  resetUserProfileState,
  resetChangePasswordState,
  resetUpdateContactInfoState,
  resetLocationDataState,
  resetUpdateKycState,
} = settingsSlice.actions;

export default settingsSlice.reducer;
