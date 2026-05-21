import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const blogs = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/blogs' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    image: image().optional(),
    author: z.string().optional(),
  }),
});
