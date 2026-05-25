import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const clients = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/clients' }),
  schema: ({ image }) => z.object({
    name: z.string().optional(),
    year: z.number().optional(),
    logo: image().optional(),
    logoDark: image().optional(),
  }),
});
