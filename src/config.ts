interface ApiUrls {
  signUp: string;
  login: string;
  forgotPassword: string;
  forgotPasswordOtp: string;
  requestOtp: string;
  validateOtp: string;
  resetPassword: string;
  emailVerificationResend: string;
  emailVerification: string;
  phoneNumberVerification: string;
  phoneNumberVerificationOtp: string;
  kycInfoSubmit: string;
}

// const BASE_URL = 'https://nssf-backend-b65295a32eec.herokuapp.com/api/';
const BASE_URL =
  "http://ec2-44-196-252-114.compute-1.amazonaws.com/api/v1/agent/";

export const apiUrl: ApiUrls = {
  signUp: `${BASE_URL}process/signup`,
  login: `${BASE_URL}request/login`,
  validateOtp: `${BASE_URL}otp/validate`,
  requestOtp: `${BASE_URL}request/resend/verification-email`,
  forgotPassword: `${BASE_URL}request/password-reset-token`,
  forgotPasswordOtp: `${BASE_URL}verify/password-reset-token`,
  resetPassword: `${BASE_URL}process/password-reset`,
  emailVerificationResend: `${BASE_URL}request/resend/verification-email`,
  emailVerification: `${BASE_URL}verify/email`,
  phoneNumberVerification: `${BASE_URL}request/mobile-token`,
  phoneNumberVerificationOtp: `${BASE_URL}verify/mobile-token`,
  kycInfoSubmit: `${BASE_URL}process/kyc-submit`,
};
