
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

  export interface EmailVerificationData {
    uid: string;
    email_token: string;
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

  export interface PhoneNumberVerificationData {
    mobile_number: string;
    otp?: string;
  }

  export interface KycInfoSubmitData {
    address: string;
    nationality: string;
    gender: string;
    date_of_birth: string;
    mobile_number: string;
    id_type: string;
    id_number: string;
    id_front: File;
    id_back: File;
    // id_front: string;
    // id_back: string;
  }
