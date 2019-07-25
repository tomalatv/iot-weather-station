// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyAdoYF9ucVY5SVAfVRWbGa1xFcDbyetpAI",
      authDomain: "iotruuviweatherstation.firebaseapp.com",
      databaseURL: "https://iotruuviweatherstation.firebaseio.com",
      projectId: "iotruuviweatherstation",
      storageBucket: "iotruuviweatherstation.appspot.com",
      messagingSenderId: "967962929494",
      appId: "1:967962929494:web:036eff05b26e2b5c"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
