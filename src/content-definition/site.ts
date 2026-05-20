import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const site = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/site' }),
  schema: z.any(),
});
