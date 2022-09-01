// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  API_ENDPOINTS: {
    Api_url: `http://dev.acintyo.co.in/api/`,
    SMS_API: 'https://api.msg91.com/api/v5/otp',
  },
  API_Key: {
    Sms_AuthKey: '374579AeR6hq3x6231b4a2P1',
    Sms_Template_key: '62471d2d12bc210b8700e153',
  },
  Sms_Otp_length : 6,
  Sms_Otp_expiry : 10
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
