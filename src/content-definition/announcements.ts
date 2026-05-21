import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const announcements = defineCollection({
  loader: glob({
    pattern: "**/index.mdx",
    base: "./src/content/announcements",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional(),
      active: z.boolean(),
      order: z.number().optional(),
      image: image().optional(), // co-located image, e.g. "./Matterhorn.jpg"
      size: z.enum(["small", "large"]).optional(), // small=max-w-lg, large=max-w-2xl
      card3d: z.boolean().optional(),
      variant: z.enum(["image-top", "image-left", "image-right", "image-only", "text-only"]).optional(),
    }),
});
