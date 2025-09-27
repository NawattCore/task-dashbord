// next.config.ts
import withPWA from 'next-pwa';

const withPWAConfigured = withPWA({
  dest: 'public', // service worker & manifest output
  register: true,
  skipWaiting: true,
  disable: false, // disable in dev
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

export default withPWAConfigured(nextConfig);
