import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const splashModals = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/splash-modals' }),
  schema: z.object({
    title: z.string(),
    active: z.boolean(),
    order: z.number().optional(),
    image: z.string().optional(), // path relative to public/, e.g. "/Matterhorn.jpg"
  }),
});
