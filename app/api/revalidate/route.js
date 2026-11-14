// Called by a Sanity webhook whenever a post or category is published,
// updated, or deleted. It clears the cached blog data so the change shows up
// on the site within seconds instead of waiting for the 5 minute fallback.
import { revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';
import { BLOG_TAG } from '../../../sanity/lib/client';

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new Response('SANITY_REVALIDATE_SECRET is not set', { status: 500 });
  }

  try {
    // The third argument waits briefly so the Sanity CDN already serves the
    // new content when the pages are rebuilt.
    const { isValidSignature, body } = await parseBody(request, secret, true);
    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    revalidateTag(BLOG_TAG);
    return Response.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
