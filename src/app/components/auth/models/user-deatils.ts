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

export class EmailPhoneModel {
  email: string;
  mobileNumber: string;
  constructor( email: string,
    mobileNumber: string) {
      this.email = email;
      this.mobileNumber = mobileNumber;

  }
}

export interface MobileNumber {
  mobileNumber: string;
}


export interface AlertModel {
  type:string,
  msg:string,
  timeout:number
}