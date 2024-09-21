/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_CURRENT_MODE: process.env.APP_CURRENT_MODE,
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    MONGO_DB_COLLECTION_NAME_PROFILES:
      process.env.MONGO_DB_COLLECTION_NAME_PROFILES,
    MONGO_DB_COLLECTION_NAME_ARTICLES:
      process.env.MONGO_DB_COLLECTION_NAME_ARTICLES,
    MONGO_DB_COLLECTION_NAME_RESPONSES:
      process.env.MONGO_DB_COLLECTION_NAME_RESPONSES,
    MONGO_DB_DATABASE_NAME_DEV: process.env.MONGO_DB_DATABASE_NAME_DEV,
    MONGO_DB_DATABASE_NAME_PROD: process.env.MONGO_DB_DATABASE_NAME_PROD,
  },
  images: {
    domains: ["jdugegptstorage1.blob.core.windows.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jdugegptstorage1.blob.core.windows.net",
        port: "",
        pathname: "/avatars/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
