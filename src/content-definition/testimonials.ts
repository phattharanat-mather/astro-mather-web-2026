import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const testimonials = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/testimonials' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    order: z.number(),
    image: image().optional(),
    featured: z.boolean().optional(),
  }),
});
