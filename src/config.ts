interface ApiUrls {
    signUp: string;
    forgotPassword: string;
    validateOtp: string;
  }
  
  const BASE_URL = 'https://nssf-backend-b65295a32eec.herokuapp.com/api/';
  
  export const apiUrl: ApiUrls = {
    signUp: `${BASE_URL}auth/signup`,
    forgotPassword: `${BASE_URL}auth/password/forgot`,
    validateOtp: `${BASE_URL}otp/validate`,
  };