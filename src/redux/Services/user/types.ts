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