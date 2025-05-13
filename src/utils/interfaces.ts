export interface Player {
  full_name: string;
  total_sp: number;
  badge: string;
}

export interface Badge {
  name: string;
  logo: string;
  minimum_sp: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface KycPersonalInfo {
  name: string;
  address: string;
  nationality: string;
  gender: string;
  dateOfBirth: string;
  idType: string;
  idNumber: string;
  frontFile: string;
  backFile: string;
  mobileNumber: string;
}

export interface InstituteData {
  id: string;
  name: string;
  address: string;
  type: string;
}

export interface SurveyCategory {
  id: string;
  name: string;
  description: string;
}
