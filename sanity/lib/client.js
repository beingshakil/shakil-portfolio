import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Only published documents reach the site; drafts stay in the Studio.
  perspective: 'published',
});

// Every blog query is cached under this tag. Publishing in the Studio calls
// /api/revalidate (via a Sanity webhook), which clears the tag so the change
// is live within seconds. REVALIDATE_SECONDS is the fallback if the webhook
// is missing or fails.
export const BLOG_TAG = 'blog';
const REVALIDATE_SECONDS = 300;

export function sanityFetch(query, params = {}) {
  return client.fetch(query, params, {
    next: { revalidate: REVALIDATE_SECONDS, tags: [BLOG_TAG] },
  });
}
