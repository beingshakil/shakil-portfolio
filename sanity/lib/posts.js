// Blog data layer: GROQ queries plus a mapper that turns Sanity documents
// into the same post shape the components already used with the JSON files
// (heading, image, imageAlt, category, date, readingTime, metadata).
import { sanityFetch } from './client';
import { urlFor } from './image';
import { blogMeta } from '../../app/data/blog/index';

const CARD_FIELDS = `
  _id,
  "slug": slug.current,
  title,
  description,
  seoTitle,
  author,
  publishedAt,
  readingTime,
  "category": category->title,
  coverImage,
  "textLength": length(pt::text(body))
`;

const ALL_POSTS_QUERY = `*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc, _createdAt desc) { ${CARD_FIELDS} }`;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  ${CARD_FIELDS},
  body[] {
    ...,
    _type == "image" => { ..., "dimensions": asset->metadata.dimensions }
  }
}`;

const DEFAULT_AUTHOR = 'Md Shakil Hossen';

// "2026-06-12" -> "Jun 12, 2026". Formatted in UTC so the day never shifts.
function formatDate(isoDate) {
  if (!isoDate) return '';
  const d = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

// Uses the minutes typed in the Studio, otherwise estimates from the text
// (about 6 characters per word, 200 words per minute).
function readingMinutes(doc) {
  if (doc.readingTime) return doc.readingTime;
  return Math.max(1, Math.ceil((doc.textLength || 0) / 6 / 200));
}

function toPost(doc) {
  if (!doc) return null;
  const hasCover = Boolean(doc.coverImage?.asset);
  const minutes = readingMinutes(doc);

  return {
    id: doc._id,
    slug: doc.slug,
    heading: doc.title,
    title: doc.title,
    category: doc.category || '',
    subtitle: doc.category || '',
    image: hasCover ? urlFor(doc.coverImage).width(1600).fit('max').url() : null,
    cardImage: hasCover ? urlFor(doc.coverImage).width(800).height(480).fit('crop').url() : null,
    ogImage: hasCover ? urlFor(doc.coverImage).width(1200).height(630).fit('crop').url() : null,
    imageAlt: doc.coverImage?.alt || doc.title,
    date: formatDate(doc.publishedAt),
    isoDate: doc.publishedAt,
    author: doc.author || DEFAULT_AUTHOR,
    readingTime: `${minutes} mins`,
    readingMinutes: minutes,
    metadata: {
      title: doc.seoTitle || doc.title,
      description: doc.description || '',
    },
    body: doc.body || [],
  };
}

export async function getAllPosts() {
  const docs = await sanityFetch(ALL_POSTS_QUERY);
  return (docs || []).map(toPost);
}

export async function getPostBySlug(slug) {
  const doc = await sanityFetch(POST_QUERY, { slug });
  return toPost(doc);
}

// Same shape the Blog section has always received: { meta, posts, categories }.
export async function getBlogData() {
  const posts = await getAllPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
  return { meta: blogMeta, posts, categories };
}

// Three other posts, same category first, then the newest.
export function pickRelatedPosts(post, allPosts, count = 3) {
  return allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => (b.category === post.category) - (a.category === post.category))
    .slice(0, count);
}
