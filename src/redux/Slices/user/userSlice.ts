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
  triggerPhoneNumberVerification,
  triggerPhoneNumberVerificationOtp,
  triggerKycInfoSubmit,
  triggerGetAllInstitute,
  triggerGetInstituteById,
} from "../../Services/user/UserServices";

interface ErroResponseData {
  message: string;
  status_code?: number;
  results?: Record<string, string[]>;
}
interface UserState {
  userData: Record<string, any>;
  loading: boolean;
  error: string | null;
  message: string | null;
  statusCode?: number | null;
  email: string;
  otpToken: string;
  kycPhoneNumber: string;
  kycPersonalInfo: Record<string, any>;
  instituteData: Record<string, any>;
  surveyCategories: Record<string, any>;
  forgotPasswordOtp: {
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

const initialState: UserState = {
  userData: {},
  loading: false,
  error: null,
  message: null,
  statusCode: null,
  email: "",
  otpToken: "",
  kycPhoneNumber: "",
  kycPersonalInfo: {},
  instituteData: {},
  surveyCategories: {},
  forgotPasswordOtp: {
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
    },
    setKycPhoneNumber: (state, action: PayloadAction<string>) => {
      state.kycPhoneNumber = action.payload;
    },
    setKycPersonalInfo: (state, action: PayloadAction<Record<string, any>>) => {
      state.kycPersonalInfo.name = action.payload.name;
      state.kycPersonalInfo.address = action.payload.address;
      state.kycPersonalInfo.state_id = action.payload.state_id;
      state.kycPersonalInfo.lga_id = action.payload.lga_id;
      state.kycPersonalInfo.nationality = action.payload.nationality;
      state.kycPersonalInfo.gender = action.payload.gender;
      state.kycPersonalInfo.dateOfBirth = action.payload.dateOfBirth;
      state.kycPersonalInfo.idType = action.payload.idType;
      state.kycPersonalInfo.idNumber = action.payload.idNumber;
      state.kycPersonalInfo.frontFile = action.payload.frontFile;
      state.kycPersonalInfo.backFile = action.payload.backFile;
      state.kycPersonalInfo.mobileNumber = action.payload.mobileNumber;
    },
    resetForgotPasswordOtp: (state) => {
      state.forgotPasswordOtp.error = initialState.forgotPasswordOtp.error;
      state.forgotPasswordOtp.message = initialState.forgotPasswordOtp.message;
      state.forgotPasswordOtp.statusCode =
        initialState.forgotPasswordOtp.statusCode;
    },
    resetResetPassword: (state) => {
      state.resetPassword.error = initialState.resetPassword.error;
      state.resetPassword.message = initialState.resetPassword.message;
      state.resetPassword.statusCode = initialState.resetPassword.statusCode;
    },
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
        },
      )
      .addCase(
        triggerUserSignup.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.message = action.payload.message;
        },
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
        },
      )
      .addCase(
        triggerForgotPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        },
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
        },
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
        },
      )
      .addCase(triggerForgotPasswordOtp.pending, (state) => {
        state.forgotPasswordOtp.loading = true;
        state.forgotPasswordOtp.error = false;
      })
      .addCase(
        triggerForgotPasswordOtp.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          console.log("FORGOTPASSWWOROTP DOTP actionforgotPasswordOtp", action);
          state.forgotPasswordOtp.loading = false;
          state.forgotPasswordOtp.message = action.payload.message;
          state.forgotPasswordOtp.statusCode = action.payload.status_code;
          state.forgotPasswordOtp.data = action.payload.results;
          state.otpToken =
            action.payload.results?.access_credentials.token || "";
        },
      )
      .addCase(
        triggerForgotPasswordOtp.rejected,
        (state, action: PayloadAction<any>) => {
          console.log("actionforgotPasswordOtprejected", action);
          state.forgotPasswordOtp.loading = false;
          state.forgotPasswordOtp.error = action.payload.status_code;
          state.forgotPasswordOtp.message = action.payload.message;
          state.forgotPasswordOtp.statusCode = action.payload.status_code;
        },
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
        },
      )
      .addCase(
        triggerOTPRequest.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        },
      )
      .addCase(triggerResetPassword.pending, (state) => {
        state.resetPassword.loading = true;
        state.resetPassword.error = false;
      })
      .addCase(
        triggerResetPassword.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          console.log("actionresetPassword", action);
          state.resetPassword.loading = false;
          state.resetPassword.message = action.payload.message;
          state.resetPassword.statusCode = action.payload.status_code;
          state.resetPassword.data = action.payload.results;
          state.resetPassword.error = false;
        },
      )
      .addCase(
        triggerResetPassword.rejected,
        (state, action: PayloadAction<any>) => {
          console.log("actionresetPasswordrejected", action);
          state.resetPassword.loading = false;
          state.resetPassword.error = action.payload.message;
          state.resetPassword.statusCode = action.payload.status_code;
          state.resetPassword.data = action.payload.results;
          state.resetPassword.message = action.payload.message;
        },
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
          state.userData = action.payload.data;
          state.message = action.payload.message;
        },
      )
      .addCase(
        triggerUserLogin.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.message = action.payload.message;
        },
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
        },
      )
      .addCase(
        triggerEmailVerificationResend.rejected,
        (state, action: PayloadAction<ErroResponseData | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Email verification failed";
          state.message =
            action.payload?.message || "Email verification failed";
          state.statusCode = action.payload?.status_code || null;
        },
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
        },
      )
      .addCase(
        triggerEmailVerification.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
        },
      )
      .addCase(triggerPhoneNumberVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerPhoneNumberVerification.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.message = action.payload;
        },
      )
      .addCase(
        triggerPhoneNumberVerification.rejected,
        (state, action: PayloadAction<ErroResponseData | undefined>) => {
          state.loading = false;
          state.error =
            action.payload?.message || "Phone number verification failed";
          state.message =
            action.payload?.message || "Phone number verification failed";
          state.statusCode = action.payload?.status_code || null;
        },
      )
      .addCase(triggerPhoneNumberVerificationOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerPhoneNumberVerificationOtp.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
        },
      )
      .addCase(
        triggerPhoneNumberVerificationOtp.rejected,
        (state, action: PayloadAction<ErroResponseData | undefined>) => {
          state.loading = false;
          state.error =
            action.payload?.message || "Phone number verification failed";
          state.message =
            action.payload?.message || "Phone number verification failed";
          state.statusCode = action.payload?.status_code || null;
        },
      )
      .addCase(triggerKycInfoSubmit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerKycInfoSubmit.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
        },
      )
      .addCase(
        triggerKycInfoSubmit.rejected,
        (state, action: PayloadAction<ErroResponseData | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Kyc info submit failed";
          state.message = action.payload?.message || "Kyc info submit failed";
          state.statusCode = action.payload?.status_code || null;
        },
      )
      .addCase(triggerGetAllInstitute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerGetAllInstitute.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.instituteData = action.payload.results as Record<string, any>;
          state.message = action.payload.message;
        },
      )
      .addCase(
        triggerGetAllInstitute.rejected,
        (state, action: PayloadAction<ErroResponseData | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Institute not found";
          state.message = action.payload?.message || "Institute not found";
          state.statusCode = action.payload?.status_code || null;
        },
      )
      .addCase(triggerGetInstituteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerGetInstituteById.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.instituteData = action.payload as Record<string, any>;
          state.message = action.payload.message;
        },
      )
      .addCase(
        triggerGetInstituteById.rejected,
        (state, action: PayloadAction<ErroResponseData | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Institute not found";
          state.message = action.payload?.message || "Institute not found";
          state.statusCode = action.payload?.status_code || null;
        },
      );
  },
});

export const {
  clearData,
  resetState,
  setUserEmail,
  resetUserData,
  setKycPhoneNumber,
  setKycPersonalInfo,
  resetForgotPasswordOtp,
  resetResetPassword,
} = userSlice.actions;

export default userSlice.reducer;
