// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3333',
  socket: 'http://localhost:3333',
  apps: {
    facebook: '513024756601831',
    google:
      '331672215174-0hlpm8fhjphiou05ovsd82vglor401ct.apps.googleusercontent.com',
    apple: {
      clientId: 'nest-auth.ubbly.club',
      redirectUri: 'https://nest-auth.ubbly.club/',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
