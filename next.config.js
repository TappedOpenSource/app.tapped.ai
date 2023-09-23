module.exports = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  reactStrictMode: true,
  images: {
    // formats: ['image/avif', 'image/webp', 'image/png', 'image/jpeg'],
    domains: [
      'res.cloudinary.com',
      'firebasestorage.googleapis.com',
      'files.stripe.com',
    ],
  },
};
