export class UserAccount {
  firstName: string;
  email: string;
  mobileNumber: number;
  otp: string;
  password: string;
  constructor(
    firstName: string,
    email: string,
    mobileNumber: number,
    otp: string,
    password: string,
  ) {
    this.firstName = firstName;
    (this.email = email), 
    (this.mobileNumber = mobileNumber);
    this.otp = otp;
    this.password = password;
  }
}
