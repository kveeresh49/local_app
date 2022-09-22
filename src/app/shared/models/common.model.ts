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


export class GoogleCoordinate {
  lat:string;
  lng:string;
  constructor(lat:string,lng:string) {
    this.lat = lat;
    this.lng = lng;
  }
}


export class AddressModel {
  pinCode?: number;
  addressLine1?: string;
  landMark?: string;
  city?: string;
  region?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  storeName?: string;
  name?:string;
  mobileNumber?:string;
  addressType?:string;
  constructor(
    pinCode?: number,
    addressLine1?: string,
    landMark?: string,
    city?: string,
    region?: string,
    state?: string,
    country?: string,
    latitude?: number,
    longitude?: number,
    storeName?: string,
    name?:string,
    mobileNumber?:string,
    addressType?:string,
  ) {
    this.pinCode = pinCode;
    this.addressLine1 = addressLine1;
    this.city = city;
    this.landMark = landMark;
    this.latitude = latitude;
    this.region = region;
    this.state = state;
    this.country = country;
    this.longitude = longitude;
    this.storeName = storeName;
    this.name = name;
    this.mobileNumber = mobileNumber,
    this.addressType = addressType;
  }
}