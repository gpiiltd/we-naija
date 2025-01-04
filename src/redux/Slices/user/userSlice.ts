import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ForgotPasswordResponse,
  SignupResponse,
} from "../../Services/user/types";
import {
  triggerForgotPassword,
  triggerOTPRequest,
  triggerOTPValidation,
  triggerResetPassword,
  triggerUserSignup,
} from "../../Services/user/UserServices";

interface UserState {
  userData: Record<string, any>;
  loading: boolean;
  error: string | null;
  message: string | null;
  email: string;
}

const initialState: UserState = {
  userData: {},
  loading: false,
  error: null,
  message: null,
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearData(state) {
      state.userData = {};
    },
    resetState: (state) => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.loading = initialState.loading;
      state.userData = initialState.userData;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(triggerUserSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerUserSignup.fulfilled,
        (state, action: PayloadAction<SignupResponse>) => {
          state.loading = false;
          state.userData = action.payload.data;
          state.message = action.payload.data.message;
        }
      )
      .addCase(
        triggerUserSignup.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(triggerForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerForgotPassword.fulfilled,
        (state, action: PayloadAction<ForgotPasswordResponse>) => {
          state.loading = false;
          state.message = action.payload.data || null;
        }
      )
      .addCase(
        triggerForgotPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      )
      .addCase(triggerOTPValidation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerOTPValidation.fulfilled,
        (state, action: PayloadAction<ForgotPasswordResponse>) => {
          state.loading = false;
          state.message = action.payload.data || null;
        }
      )
      .addCase(
        triggerOTPValidation.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      )
      .addCase(triggerOTPRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerOTPRequest.fulfilled,
        (state, action: PayloadAction<ForgotPasswordResponse>) => {
          state.loading = false;
          state.message = action.payload.data || null;
        }
      )
      .addCase(
        triggerOTPRequest.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      )
      .addCase(triggerResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerResetPassword.fulfilled,
        (state, action: PayloadAction<ForgotPasswordResponse>) => {
          state.loading = false;
          state.message = action.payload.data || null;
        }
      )
      .addCase(
        triggerResetPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});

export const { clearData, resetState, setUserEmail } = userSlice.actions;

export default userSlice.reducer;
