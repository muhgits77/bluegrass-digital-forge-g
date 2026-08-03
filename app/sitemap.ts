import { MetadataRoute } from 'next';
import { SITE_URL, canonicalUrl } from '@/lib/constants';
import { getAllDemoLandingSlugs } from '@/lib/demoLandings';

/**
 * Dynamic sitemap.xml generator for local SEO.
 * Only https://bluegrassdigitalforge.com URLs — never .live or staging hosts.
 * Includes specialty hubs and first-party /work/[slug] portfolio landings.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/truckdash', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/work', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/food-truck-websites', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/restaurant-websites', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/marina-websites', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/fishing-guide-websites', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/business-cards', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/templates', priority: 0.65, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/quote', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/service-areas', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/south-carolina', priority: 0.85, changeFrequency: 'monthly' as const },
  ];

  const demoLandings = getAllDemoLandingSlugs().map((slug) => ({
    path: `/work/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  return [...routes, ...demoLandings].map((route) => ({
    url: route.path === '/' ? `${SITE_URL}/` : canonicalUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
