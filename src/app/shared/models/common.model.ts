export class MobileNumberObj {
  mobileNumber: string;
  constructor(mobileNumber: string) {
    this.mobileNumber = mobileNumber;
  }
}

export class OtpLoginModelObj {
  mobileNumber: number;
  otp: number;
  constructor(mobileNumber: number, otp: number) {
    this.mobileNumber = mobileNumber;
     this.otp = otp;
  }
}
