import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const openPositions = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/open-positions' }),
  schema: z.object({
    title: z.string(),
    department: z.string(),
    location: z.string(),
    type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
    postedDate: z.coerce.date(),
    summary: z.string(),
    salary: z.string().optional(),
    open: z.boolean().default(true),
  }),
});
