// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBpSB_BU86_AfAYBTV0mlET-UTvT7VorSk",
    authDomain: "share-services.firebaseapp.com",
    databaseURL: "https://share-services.firebaseio.com",
    projectId: "share-services",
    storageBucket: "share-services.appspot.com",
    messagingSenderId: "198821648121"
  },
  alphavantage: {
    apiKey: "X6LFE5D5SAPI8P2R"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
