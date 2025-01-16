interface ApiUrls {
    signUp: string;
    forgotPassword: string;
    requestOtp: string;
    validateOtp: string;
    resetPassword: string;
  }
  
  const BASE_URL = 'https://nssf-backend-b65295a32eec.herokuapp.com/api/';
  
  export const apiUrl: ApiUrls = {
    signUp: `${BASE_URL}auth/signup`,
    forgotPassword: `${BASE_URL}auth/password/forgot`,
    requestOtp: `${BASE_URL}otp/`,
    validateOtp: `${BASE_URL}otp/validate`,
    resetPassword: `${BASE_URL}auth/password/reset`,
  };