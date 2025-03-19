
  export interface SignupResponse {
    status_code: number;
    status: string;
    message: string;
  }

  interface Userdata {
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    username: string;
    address: string;
    nationality: string;
    gender: string;
    dateOfBirth: string;
    idType: string;
    idNumber: string;
    idFrontCoverPhoto: string;
    idBackCoverPhoto: string;
    createdAt: string;
    updatedAt: string;

  }
  export interface LoginResponse {
    code: number;
    data:{
      user:Userdata;
      token_string: string;
      message: string;
    }
  }
  export interface ForgotPasswordData {
    email: string;
  }
  
  export interface ForgotPasswordResponse {
    code: number;
    data?: string;
    message?: string;
  }

  export interface OTPData {
    otp: string;
  }

  export interface OTPRequestData {
    email: string;
  }

  export interface ResetPasswordData {
    new_password: string;
    confirm_new_password: string;
  }

  export interface DefaultResponse {
    status_code: number;
    status: string;
    message: string;
    results?: {
      access_credentials: {
        token: string;
      };
    };
  }
