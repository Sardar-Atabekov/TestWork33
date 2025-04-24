const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    NEXT_PUBLIC_OPENWEATHERMAP_API_KEY:
      process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
  },
  async redirects() {
    return [
      {
        source: '/forecast',
        destination: '/',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
    };
    return config;
  },
};

module.exports = nextConfig;
