const DEVELOPMENT_SITE_URL = 'http://localhost:3000';

export function resolveSiteUrl(value: string | undefined, nodeEnv: string | undefined): URL {
  const candidate = value?.trim();
  if (!candidate) {
    if (nodeEnv === 'development') return new URL(DEVELOPMENT_SITE_URL);
    throw new Error('NEXT_PUBLIC_SITE_URL is required outside development. Set it to the public site origin before building.');
  }

  let parsed: URL;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a valid absolute URL.');
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('NEXT_PUBLIC_SITE_URL must use http or https.');
  if (parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== '/') {
    throw new Error('NEXT_PUBLIC_SITE_URL must contain only an origin, without credentials, path, query, or hash.');
  }
  return new URL(parsed.origin);
}

export function getSiteUrl(): URL {
  return resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, process.env.NODE_ENV);
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}
