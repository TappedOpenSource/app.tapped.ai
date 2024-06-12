import MillionLint from "@million/lint";
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  reactStrictMode: true,
  images: {
    // formats: ['image/avif', 'image/webp', 'image/png', 'image/jpeg'],
    dangerouslyAllowSVG: true,
    remotePatterns: [{
      protocol: "https",
      hostname: "firebasestorage.googleapis.com",
    }, {
      protocol: "http",
      hostname: "localhost",
      port: "3000",
    }, {
      protocol: "https",
      hostname: "files.stripe.com",
    }, {
      protocol: "https",
      hostname: "res.cloudinary.com",
    }, {
      protocol: "https",
      hostname: "storage.googleapis.com",
    }, {
      protocol: "https",
      hostname: "songbyrddc.com",
    }, {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
    },
    {
      protocol: "https",
      hostname: "images.squarespace-cdn.com",
    }],
  },
};

export default MillionLint.next({ rsc: true })(nextConfig);
