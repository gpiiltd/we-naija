import { createSlice } from "@reduxjs/toolkit";
import {
  triggerRequestForgotPasswordOtp,
  triggerResetPassword,
} from "./authService";
interface IinitialState {
  passwordOtp: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  resetPassword: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
}

const initialState: IinitialState = {
  passwordOtp: {
    data: {},
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  resetPassword: {
    data: {},
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetPasswordOtp: (state) => {
      state.passwordOtp.error = initialState.passwordOtp.error;
      state.passwordOtp.message = initialState.passwordOtp.message;
      state.passwordOtp.statusCode = initialState.passwordOtp.statusCode;
    },
    resetResetPassword: (state) => {
      state.resetPassword.error = initialState.resetPassword.error;
      state.resetPassword.message = initialState.resetPassword.message;
      state.resetPassword.statusCode = initialState.resetPassword.statusCode;
    },
  },
  extraReducers: (builder) => {
    //REQUEST FORGOT PASSWORD OTP
    builder
      .addCase(triggerRequestForgotPasswordOtp.pending, (state) => {
        state.passwordOtp.loading = true;
        state.passwordOtp.error = false;
        state.passwordOtp.data = {};
        state.passwordOtp.message = "";
      })
      .addCase(triggerRequestForgotPasswordOtp.fulfilled, (state, action) => {
        console.log("FULFILLEDaction.payload", action.payload);
        state.passwordOtp.loading = false;
        state.passwordOtp.data = action.payload;
        state.passwordOtp.message = action.payload.message as unknown as string;
        state.passwordOtp.statusCode = action.payload
          ?.status_code as unknown as number;
      })
      .addCase(triggerRequestForgotPasswordOtp.rejected, (state, action) => {
        console.log("REJECTEDaction.payload", action.payload);
        state.passwordOtp.loading = false;
        state.passwordOtp.error = true;
        state.passwordOtp.message = action.payload
          ?.message as unknown as string;
        state.passwordOtp.statusCode = action.payload
          ?.status_code as unknown as number;
      });

    //RESET PASSWORD
    builder
      .addCase(triggerResetPassword.pending, (state) => {
        state.resetPassword.loading = true;
        state.resetPassword.error = false;
      })
      .addCase(triggerResetPassword.fulfilled, (state, action) => {
        state.resetPassword.loading = false;
        state.resetPassword.data = action.payload;
        state.resetPassword.message = action.payload
          ?.message as unknown as string;
        state.resetPassword.statusCode = action.payload
          ?.status_code as unknown as number;
      })
      .addCase(triggerResetPassword.rejected, (state, action) => {
        state.resetPassword.loading = false;
        state.resetPassword.error = true;
        state.resetPassword.message = action.payload
          ?.message as unknown as string;
        state.resetPassword.statusCode = action.payload
          ?.status_code as unknown as number;
      });
  },
});
export const { resetPasswordOtp, resetResetPassword } = authSlice.actions;

export default authSlice.reducer;
