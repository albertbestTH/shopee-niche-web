import type { MetadataRoute } from 'next';
import { articles, categories } from '@/data/site';
import { getSitePaths } from '@/lib/site-routes';
import { absoluteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitePaths(categories, articles).map((path) => ({ url: absoluteUrl(path) }));
}
