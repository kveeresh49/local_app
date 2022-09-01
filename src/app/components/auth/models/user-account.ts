export class UserAccount {
  name: string;
  email: string;
  mobileNumber: number;
  otp: string;
  password: string;
  constructor(
    name: string,
    email: string,
    mobileNumber: number,
    otp: string,
    password: string,  
  ) {
    this.name = name;
    (this.email = email), 
    (this.mobileNumber = mobileNumber);
    this.otp = otp;
    this.password = password;
  }
}
