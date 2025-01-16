interface ApiUrls {
  signUp: string;
  login: string;
}

const BASE_URL = "https://nssf-backend-b65295a32eec.herokuapp.com/api/";

export const apiUrl: ApiUrls = {
  signUp: `${BASE_URL}auth/signup`,
  login: `${BASE_URL}auth/login`,
};
