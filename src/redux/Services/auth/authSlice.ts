import { createSlice } from "@reduxjs/toolkit";
import {
  triggerRequestForgotPasswordOtp,
  triggerResetPassword,
  triggerPhoneNumberVerificationResend,
  triggerEmailLinkResend,
  triggerEmailVerification,
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
  resendPhoneNumberOtp: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  verifyEmail: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  resendEmailLink: {
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
  resendPhoneNumberOtp: {
    data: {},
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  verifyEmail: {
    data: {},
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  resendEmailLink: {
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
    resetPhoneNumberVerificationResend: (state) => {
      state.resendPhoneNumberOtp.error =
        initialState.resendPhoneNumberOtp.error;
      state.resendPhoneNumberOtp.message =
        initialState.resendPhoneNumberOtp.message;
      state.resendPhoneNumberOtp.statusCode =
        initialState.resendPhoneNumberOtp.statusCode;
    },
    resetVerifyEmail: (state) => {
      state.verifyEmail.error = initialState.verifyEmail.error;
      state.verifyEmail.message = initialState.verifyEmail.message;
      state.verifyEmail.statusCode = initialState.verifyEmail.statusCode;
    },
    resetEmailLink: (state) => {
      state.resendEmailLink.error = initialState.resendEmailLink.error;
      state.resendEmailLink.message = initialState.resendEmailLink.message;
      state.resendEmailLink.statusCode =
        initialState.resendEmailLink.statusCode;
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

    //PHONE NUMBER VERIFICATION RESEND
    builder
      .addCase(triggerPhoneNumberVerificationResend.pending, (state) => {
        state.resendPhoneNumberOtp.loading = true;
        state.resendPhoneNumberOtp.error = false;
        state.resendPhoneNumberOtp.data = {};
        state.resendPhoneNumberOtp.message = "";
      })
      .addCase(
        triggerPhoneNumberVerificationResend.fulfilled,
        (state, action) => {
          state.resendPhoneNumberOtp.loading = false;
          state.resendPhoneNumberOtp.data = action.payload;
          state.resendPhoneNumberOtp.message = action.payload
            ?.message as unknown as string;
          state.resendPhoneNumberOtp.statusCode = action.payload
            ?.status_code as unknown as number;
        },
      )
      .addCase(
        triggerPhoneNumberVerificationResend.rejected,
        (state, action) => {
          state.resendPhoneNumberOtp.loading = false;
          state.resendPhoneNumberOtp.error = true;
          state.resendPhoneNumberOtp.message = action.payload
            ?.message as unknown as string;
          state.resendPhoneNumberOtp.statusCode = action.payload
            ?.status_code as unknown as number;
        },
      );

    //EMAIL VERIFICATION
    builder
      .addCase(triggerEmailVerification.pending, (state) => {
        state.verifyEmail.loading = true;
        state.verifyEmail.error = false;
      })
      .addCase(triggerEmailVerification.fulfilled, (state, action) => {
        state.verifyEmail.loading = false;
        state.verifyEmail.data = action.payload;
        state.verifyEmail.message = action.payload
          ?.message as unknown as string;
        state.verifyEmail.statusCode = action.payload
          ?.status_code as unknown as number;
      })
      .addCase(triggerEmailVerification.rejected, (state, action) => {
        state.verifyEmail.loading = false;
        state.verifyEmail.error = true;
        state.verifyEmail.message = action.payload
          ?.message as unknown as string;
        state.verifyEmail.statusCode = action.payload
          ?.status_code as unknown as number;
      });

    //EMAIL VERIFICATION LINK RESEND
    builder
      .addCase(triggerEmailLinkResend.pending, (state) => {
        state.resendEmailLink.loading = true;
        state.resendEmailLink.error = false;
      })
      .addCase(triggerEmailLinkResend.fulfilled, (state, action) => {
        state.resendEmailLink.loading = false;
        state.resendEmailLink.data = action.payload;
        state.resendEmailLink.message = action.payload
          ?.message as unknown as string;
        state.resendEmailLink.statusCode = action.payload
          ?.status_code as unknown as number;
      })
      .addCase(triggerEmailLinkResend.rejected, (state, action) => {
        state.resendEmailLink.loading = false;
        state.resendEmailLink.error = true;
        state.resendEmailLink.message = action.payload
          ?.message as unknown as string;
        state.resendEmailLink.statusCode = action.payload
          ?.status_code as unknown as number;
      });
  },
});
export const {
  resetPasswordOtp,
  resetResetPassword,
  resetPhoneNumberVerificationResend,
  resetEmailLink,
  resetVerifyEmail,
} = authSlice.actions;

export default authSlice.reducer;
