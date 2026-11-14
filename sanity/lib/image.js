import imageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '../env';

const builder = imageUrlBuilder({ projectId, dataset });

// urlFor(image).width(800).url() returns a resized, auto-format CDN URL.
export function urlFor(source) {
  return builder.image(source).auto('format');
}
