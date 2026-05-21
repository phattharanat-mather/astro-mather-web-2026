import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const credentialPages = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/credential-pages' }),
  schema: z.object({
    title: z.string(),
    hide: z.boolean().optional(),
  }),
});
