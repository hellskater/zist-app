export default async function sitemap() {
  const routes = ['/', '/dashboard/my-zists', '/dashboard/create-zist'].map(
    (route) => ({
      url: `https://zistapp.xyz${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes];
}
