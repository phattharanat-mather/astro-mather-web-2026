import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    index: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});
