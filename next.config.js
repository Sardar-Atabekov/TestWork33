/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    NEXT_PUBLIC_OPENWEATHERMAP_API_KEY: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
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
}

module.exports = nextConfig
