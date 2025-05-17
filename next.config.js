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

    const rules = config.module.rules.find(
      (rule) => typeof rule.oneOf === 'object'
    );
    if (rules) {
      rules.oneOf.forEach((oneOfRule) => {
        if (oneOfRule.use && Array.isArray(oneOfRule.use)) {
          oneOfRule.use.forEach((loader) => {
            if (
              loader.loader &&
              loader.loader.includes('css-loader') &&
              loader.options &&
              loader.options.modules
            ) {
              loader.options.modules.exportLocalsConvention = 'camelCaseOnly';
            }
          });
        }
      });
    }

    return config;
  },
};

module.exports = nextConfig;
