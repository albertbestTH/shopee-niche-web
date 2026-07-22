import type { MetadataRoute } from 'next';
import { getRobotsConfig } from '@/lib/site-routes';
import { getSiteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  return getRobotsConfig(getSiteUrl());
}
