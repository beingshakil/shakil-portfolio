// Single source of truth for the site's canonical origin.
// Every canonical URL, sitemap entry, robots directive, OG tag, and JSON-LD
// url is built from this value, so the whole site stays on one hostname.
//
// This MUST match the primary domain configured in Vercel (Settings > Domains).
// If they disagree, canonical tags point at a URL that redirects, and Google
// discounts them. No trailing slash: the app runs with trailingSlash: false.
export const siteUrl = 'https://beingshakil.xyz';

export default siteUrl;
