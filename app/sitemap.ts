import { MetadataRoute } from 'next';
import { getServices, getProducts, getPosts } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dienlanhsonphatphuquoc.com';

  const services = getServices();
  const products = getProducts();
  const posts = getPosts();

  const staticRoutes = [
    '',
    '/dich-vu',
    '/san-pham',
    '/blog',
    '/gioi-thieu',
    '/lien-he',
    '/chinh-sach',
    '/bao-hanh',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/dich-vu/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/san-pham/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes, ...postRoutes];
}
