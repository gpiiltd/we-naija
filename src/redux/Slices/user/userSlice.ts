import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupResponse } from "../../Services/user/types";
import { triggerUserSignup } from "../../Services/user/UserServices";


interface UserState {
  userData: Record<string, any>; 
  loading: boolean;
  error: string | null; 
}

const initialState: UserState = {
  userData: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearData(state) {
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(triggerUserSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(triggerUserSignup.fulfilled, (state, action: PayloadAction<SignupResponse>) => {
        state.loading = false;
        state.userData = action.payload.data.user; 
      })
      .addCase(
        triggerUserSignup.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An unknown error occurred"; 
        }
      );
  },
});

export const { clearData } = userSlice.actions;

export default userSlice.reducer;
