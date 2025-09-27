// next.config.js
//eslint-disable-next-line
const withPWA = require('next-pwa')({
  dest: 'public', // service worker & manifest output
  register: true,
  skipWaiting: true,
  disable: false, // disable in dev
});

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
});
