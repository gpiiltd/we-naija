interface ApiUrls {
  signUp: string;
  login: string;
  forgotPassword: string;
  requestOtp: string;
  validateOtp: string;
  resetPassword: string;
}

  
  // const BASE_URL = 'https://nssf-backend-b65295a32eec.herokuapp.com/api/';
  const BASE_URL = 'http://ec2-44-196-252-114.compute-1.amazonaws.com/api/v1/agent/';
  
  export const apiUrl: ApiUrls = {
    signUp: `${BASE_URL}process/signup`,
     login: `${BASE_URL}request/login`,
    forgotPassword: `${BASE_URL}auth/password/forgot`,
    requestOtp: `${BASE_URL}otp/`,
    validateOtp: `${BASE_URL}otp/validate`,
    resetPassword: `${BASE_URL}auth/password/reset`,
  };
