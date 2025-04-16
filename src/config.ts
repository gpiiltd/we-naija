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
  allInstitute: string;
  getInstituteById: string;
  getAllCategories: string;
  getSurveyIndicatorById: string;
  getSurveyIndicatorQuestions: string;
  submitSurveyReport: string;
  getAllCommunityTasks: string;
  getCommunityTaskById: string;
  getAllIndicators: string;
  getAllCommunityTaskCategories: string;
  getCommunityTaskCategoryById: string;
  answerTaskQuestion: string;
  getAllLeaderboardData: string;
}

// const BASE_URL = 'https://nssf-backend-b65295a32eec.herokuapp.com/api/';
const BASE_URL =
  "http://api.test.nssf.ng/api/v1/";

export const apiUrl: ApiUrls = {  
  signUp: `${BASE_URL}agent/process/signup`,
  login: `${BASE_URL}agent/request/login`,
  validateOtp: `${BASE_URL}agent/otp/validate`,
  requestOtp: `${BASE_URL}agent/request/resend/verification-email`,
  forgotPassword: `${BASE_URL}agent/request/password-reset-token`,
  forgotPasswordOtp: `${BASE_URL}agent/verify/password-reset-token`,
  resetPassword: `${BASE_URL}agent/process/password-reset`,
  emailVerificationResend: `${BASE_URL}agent/request/resend/verification-email`,
  emailVerification: `${BASE_URL}agent/verify/email`,
  phoneNumberVerification: `${BASE_URL}agent/request/mobile-token`,
  phoneNumberVerificationOtp: `${BASE_URL}agent/verify/mobile-token`,
  kycInfoSubmit: `${BASE_URL}agent/process/kyc-submit`,
  allInstitute: `${BASE_URL}get-institutions`,
  getInstituteById: `${BASE_URL}institutions`,
  getAllCategories: `${BASE_URL}categories?category_type=survey`,
  getSurveyIndicatorById: `${BASE_URL}categories`,
  getSurveyIndicatorQuestions: `${BASE_URL}survey/indicators`,
  submitSurveyReport: `${BASE_URL}survey/institutions`,
  getAllCommunityTasks: `${BASE_URL}task`,
  getCommunityTaskById: `${BASE_URL}task`,
  getAllIndicators: `${BASE_URL}indicators`,
  getAllCommunityTaskCategories: `${BASE_URL}categories?category_type=community_task`,
  getCommunityTaskCategoryById: `${BASE_URL}categories`,
  answerTaskQuestion: `${BASE_URL}task/submit`,
  getAllLeaderboardData: `${BASE_URL}leaderboard`,
};
