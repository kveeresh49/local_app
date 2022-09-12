export interface UserDetails {
  email: string;
  password: string;
}

export interface EmailLoginModel {
  email: string;
  password: string;
}

export interface OtpLoginModel {
  mobileNumber: number;
  otp: number;
}

export interface PasswordResetModel {
  mobileNumber: number;
  otp: number;
  password: string;
}

export interface EmailPhoneModel {
  email: 'string';
  mobileNumber: 'string';
}

export interface MobileNumber {
  mobileNumber: 'string';
}
