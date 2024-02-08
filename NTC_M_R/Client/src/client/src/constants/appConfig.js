// export default {
//     // The URL we're connecting to
//     hostname: 'https://mapi.dev.onedine.com:4443',
//     // Map shortnames to the actual endpoints, so that we can use them in the middleware
//     endpoints: {
//       login: 'before/api/token',
//       register: '/api/account/register',
//       reset_password: '/api/account/reset/password',
//       fonts: '/api/fonts/getFontList/'
//     }
//   };

  export default {
//   LOGIN: `${TITLE} Login`,
//   SIGNUP: `${TITLE} Sign up`,
//   RESET_PASSWORD: `${TITLE} Reset password`,
//   BASE_URL: process.env.PUBLIC_URL,
      endpoints: {
      login: 'before/api/token',
      register: '/api/account/register',
      reset_password: '/api/account/reset/password',
      fonts: '/api/fonts/getFontList/'
    }
};