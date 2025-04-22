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

interface UserState {
  userData: Record<string, any>;
  loading: boolean;
  error: string | null;
  message: string | null;
  email: string;
  otpToken: string;
  kycPhoneNumber: string;
  kycPersonalInfo: Record<string, any>;
  instituteData: Record<string, any>;
  surveyCategories: Record<string, any>;
}

const initialState: UserState = {
  userData: {},
  loading: false,
  error: null,
  message: null,
  email: "",
  otpToken: "",
  kycPhoneNumber: "",
  kycPersonalInfo: {},
  instituteData: {},
  surveyCategories: {},
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
      state.kycPersonalInfo.nationality = action.payload.nationality;
      state.kycPersonalInfo.gender = action.payload.gender;
      state.kycPersonalInfo.dateOfBirth = action.payload.dateOfBirth;
      state.kycPersonalInfo.idType = action.payload.idType;
      state.kycPersonalInfo.idNumber = action.payload.idNumber;
      state.kycPersonalInfo.frontFile = action.payload.frontFile;
      state.kycPersonalInfo.backFile = action.payload.backFile;
      state.kycPersonalInfo.mobileNumber = action.payload.mobileNumber;
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
        },
      )
      .addCase(
        triggerForgotPasswordOtp.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.status_code;
          state.message = action.payload.message;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerResetPassword.fulfilled,
        (state, action: PayloadAction<DefaultResponse>) => {
          state.loading = false;
          state.message = action.payload.message;
        },
      )
      .addCase(
        triggerResetPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
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
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
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
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
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
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
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
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload.message;
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
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.instituteData = {} as Record<string, any>; // Fix: Ensure instituteData is set to undefined on rejection
          state.error = action.payload.message;
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
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.instituteData = {} as Record<string, any>;
          state.error = action.payload.message;
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
} = userSlice.actions;

export default userSlice.reducer;
