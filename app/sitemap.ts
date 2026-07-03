import { MetadataRoute } from 'next';

/**
 * Dynamic sitemap.xml generator for local SEO.
 * Includes all key pages targeting "Monticello KY website designer",
 * "Lake Cumberland business websites", "Wayne County web design",
 * "food truck website Kentucky", "restaurant website Monticello KY".
 * For future: can expand routes or add static public/sitemap.xml override.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bluegrassdigitalforge.com';

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
    { url: '/service-areas', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
