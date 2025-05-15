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
  getTaskQuestions: string;
  submitSurveyReportMultiple: string;
  getUserProfile: string;
  getNotifications: string;
  readNotifications: string;
  logout: string;
  getAllLeaderboardDataPublic: string;
  changePassword: string;
  updateContactInfo: string;
  getLocation: string;
}

// const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://api.test.nssf.ng/api/v1/";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

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
  getTaskQuestions: `${BASE_URL}task`,
  submitSurveyReportMultiple: `${BASE_URL}survey/institutions`,
  getUserProfile: `${BASE_URL}agent/profile/`,
  getNotifications: `${BASE_URL}notifications`,
  readNotifications: `${BASE_URL}notifications/mark_as_read`,
  logout: `${BASE_URL}auth/logout`,
  getAllLeaderboardDataPublic: `${BASE_URL}leaderboard/public`,
  changePassword: `${BASE_URL}agent/process/change-password`,
  updateContactInfo: `${BASE_URL}agent/update/contact-info`,
  getLocation: `${BASE_URL}locations`,
};
