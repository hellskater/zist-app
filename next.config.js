/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.jsdelivr.net'],
  },
  redirects: async () => {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/my-zists',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
