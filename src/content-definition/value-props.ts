import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const valueProps = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/value-props' }),
  schema: z.object({
    index: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});
