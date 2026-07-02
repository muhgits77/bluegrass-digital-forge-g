import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bluegrass-digital-forge.lovable.app';

  const routes = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/work', priority: 0.95, changeFrequency: 'weekly' as const },
    { url: '/food-truck-websites', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/business-cards', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/templates', priority: 0.65, changeFrequency: 'monthly' as const },
    { url: '/about', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/quote', priority: 0.85, changeFrequency: 'weekly' as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
