import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ForgotPasswordResponse,
  SignupResponse,
  DefaultResponse,
} from "../../Services/user/types";
import {
  triggerForgotPassword,
  triggerForgotPasswordOtp,
  triggerOTPRequest,
  triggerOTPValidation,
  triggerResetPassword,
  triggerUserLogin,
  triggerUserSignup,
  triggerEmailVerificationResend,
  triggerEmailVerification,
} from "../../Services/user/UserServices";

interface UserState {
  userData: Record<string, any>;
  loading: boolean;
  error: string | null;
  message: string | null;
  email: string;
  otpToken: string;
}

const initialState: UserState = {
  userData: {},
  loading: false,
  error: null,
  message: null,
  email: "",
  otpToken: "",
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
    },
    resetUserData: (state) => {
      state.userData = initialState.userData;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      console.log("Email in state", state.email);
    },
    // setLastScreenTime: (state, action: PayloadAction<string>) => {
    //   state.lastScreenTime = action.payload;
    // }
  },

  extraReducers: (builder) => {
    builder
      .addCase(triggerUserSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userData = {};
        state.message = "";
      })
      .addCase(
        triggerUserSignup.fulfilled,
        (state, action: PayloadAction<SignupResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(
        triggerUserSignup.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.message = action.payload.message;
        }
      )

      .addCase(triggerForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerForgotPassword.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
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
          state.error = action.payload.code;
          state.message =
            typeof action.payload === "string"
              ? action.payload
              : action.payload.data;
        }
      )
      .addCase(triggerForgotPasswordOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerForgotPasswordOtp.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
          state.otpToken =
            action.payload.results?.access_credentials.token || "";
        }
      )
      .addCase(
        triggerForgotPasswordOtp.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.status_code;
          state.message = action.payload.message;
        }
      )
      .addCase(triggerOTPRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerOTPRequest.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
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
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(
        triggerResetPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      )

      //login
      .addCase(triggerUserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerUserLogin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.userData = action.payload.results;
          state.message = action.payload.message;
        }
      )
      .addCase(
        triggerUserLogin.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.message = action.payload.message;
        }
      )
      .addCase(triggerEmailVerificationResend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerEmailVerificationResend.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(
        triggerEmailVerificationResend.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      )
      .addCase(triggerEmailVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerEmailVerification.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
        }
      )
      .addCase(
        triggerEmailVerification.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});

export const { clearData, resetState, setUserEmail, resetUserData } =
  userSlice.actions;

export default userSlice.reducer;
