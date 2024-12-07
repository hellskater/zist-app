export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://zist-app.vercel.app/sitemap.xml',
    host: 'https://zist-app.vercel.app',
  };
}
