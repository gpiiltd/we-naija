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
  triggerUserLogin,
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
      state.userData = initialState.userData;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      console.log('Email in state',state.email);
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
      })
      .addCase(
        triggerUserSignup.fulfilled,
        (state, action: PayloadAction<SignupResponse>) => {
          state.loading = false;
          state.userData = action.payload.data;
          state.message = action.payload.data.message;
        }
      )
      .addCase(triggerUserSignup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload; 
        state.message = typeof action.payload === "string" ? action.payload : action.payload.data;
      })
      
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
          state.error = action.payload.data;
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
          state.message = typeof action.payload === "string" ? action.payload : action.payload.data;

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
          state.error = action.payload.data;
        }
      )

      //login
      .addCase(triggerUserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        triggerUserLogin.fulfilled,
        (state, action: PayloadAction<SignupResponse>) => {
          state.loading = false;
          state.userData = action.payload.data;
          state.message = action.payload.data.message;
        }
      )
      .addCase(
        triggerUserLogin.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.message = typeof action.payload === "string" ? action.payload : action.payload.data;
          console.log("MESSAGE", state.message);
        }
      );
  },
});

export const { clearData, resetState, setUserEmail } = userSlice.actions;

export default userSlice.reducer;
