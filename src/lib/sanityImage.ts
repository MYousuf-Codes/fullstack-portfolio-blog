import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(client);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
} 