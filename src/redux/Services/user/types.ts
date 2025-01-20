interface User {
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
  export interface SignupResponse {
    code: number;
    data: {
      user: User;
      token_string: string;
      message: string;
    };
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
    code: string;
    target: string;
  }

  export interface OTPRequestData {
    message_type: string;
    topic: string;
    target: string;
  }

  export interface ResetPasswordData {
    password: string;
    repeat_password: string;
    email?: string;
  }
