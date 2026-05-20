import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const site = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/site' }),
  schema: z.any(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    index: z.string(),
    title: z.string(),
    description: z.string(),
  }),
});

const blogs = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/blogs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    author: z.string().optional(),
  }),
});

const founderQuotes = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/founder-quotes' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    order: z.number(),
    image: image().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { site, services, blogs, founderQuotes };
