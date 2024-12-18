import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupResponse } from "../../Services/user/types";
import { triggerUserSignup } from "../../Services/user/UserServices";


interface UserState {
  userData: Record<string, any>; 
  loading: boolean;
  error: string | null; 
  message: string | null;
}

const initialState: UserState = {
  userData: {},
  loading: false,
  error: null,
  message: null,
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
        state.userData = action.payload.data;
        state.message = action.payload.data.message;
        console.log('message',action.payload.data.message)
        console.log('user data', state.userData);
      })
      .addCase(
        triggerUserSignup.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          if (action.payload) {
            state.error = action.payload.data.message;
            state.message = action.payload.data.message
            console.log('errrrra', state.error);
          } else {
            state.error = "An unknown error occurred";
          }
        }
      );
  },
});

export const { clearData } = userSlice.actions;

export default userSlice.reducer;
