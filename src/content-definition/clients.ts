import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const clients = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/clients' }),
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
  }),
});
