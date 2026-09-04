// Single source of truth for the site's canonical origin.
// Every canonical URL, sitemap entry, robots directive, OG tag, llms.txt link,
// and JSON-LD url is built from this value, so the whole site stays on one
// hostname. No trailing slash: the app runs with trailingSlash: false.
//
// Resolution order (first non-empty value wins):
//
//   1. NEXT_PUBLIC_SITE_URL          Explicit override. Set it once in Vercel
//                                    (Settings > Environment Variables) and a
//                                    domain change never touches the code.
//   2. VERCEL_PROJECT_PRODUCTION_URL Injected by Vercel with the project's
//                                    production domain, so a domain swapped in
//                                    the dashboard is picked up on the next
//                                    deploy even if nobody sets the variable
//                                    above. Deployment-specific VERCEL_URL is
//                                    deliberately NOT used: it changes on every
//                                    deploy and would make canonicals unstable.
//   3. FALLBACK_SITE_URL             Local dev and any non-Vercel build.
//
// Caveat worth knowing: Vercel fills VERCEL_PROJECT_PRODUCTION_URL with the
// SHORTEST production domain. If both the apex and the www host are attached
// and www is the primary one, that variable resolves to the apex, which only
// 308-redirects to www: a canonical pointing at a redirect gets discounted by
// Google. Whenever the primary domain is not the shortest one, set
// NEXT_PUBLIC_SITE_URL to the exact host the pages are served from.
const FALLBACK_SITE_URL = 'https://www.mdshakilhossen.info';

// Accepts "example.com", "https://example.com/" or "https://example.com" and
// always returns a bare origin: protocol present, no trailing slash.
function normalizeOrigin(value) {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw) return '';

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, '');
}

export const siteUrl =
  normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ||
  normalizeOrigin(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ||
  normalizeOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  FALLBACK_SITE_URL;

// Builds an absolute URL from a root-relative path: absoluteUrl('/about').
export function absoluteUrl(path = '') {
  if (!path) return siteUrl;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export default siteUrl;
