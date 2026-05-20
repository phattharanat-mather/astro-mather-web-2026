import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const projects = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    year: z.number(),
    categories: z.array(z.string()),
    image: image().optional(),
    featured: z.boolean().optional(),
    archived: z.boolean().optional(),
  }),
});
