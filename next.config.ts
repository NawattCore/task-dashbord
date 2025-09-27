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
    // Validate required envs at runtime (Next.js 15+)
    runtimeEnv: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
  },
};

export default withPWAConfigured(nextConfig);
