import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true,      // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV === "development", // Remove console.log in production
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false
    }
    return config
  }
}

// Configuration object tells the next-pwa plugin 
const withPWA = (await import("next-pwa")).default({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

// Export the combined configuration for Next.js with PWA support
export default withPWA(withNextIntl(nextConfig));