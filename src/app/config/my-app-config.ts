// === LOCAL ===
// export default {
//   oidc: {
//     issuer: 'https://dev-11935476.okta.com/oauth2/default',
//     clientId: '0oa3tdhcwi4zoVPZi5d7',
//     redirectUri: 'http://localhost:4200/login/callback',
//     scopes: ['openid', 'profile', 'email'],
//   },
// };

// // === LIVE ===
export default {
  oidc: {
    clientId: '0oa3tdhcwi4zoVPZi5d7',
    issuer: 'https://dev-11935476.okta.com/oauth2/default',
    redirectUri: 'https://sba-onlinestore.netlify.app/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
