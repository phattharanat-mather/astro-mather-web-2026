import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const projects = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    categories: z.array(z.string()),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});
