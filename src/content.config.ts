import { defineCollection, z } from 'astro:content';

const figurines = defineCollection({
  type: 'data',
  schema: z.object({
    nameEn: z.string(),
    nameEs: z.string().optional(),
    nameIt: z.string().optional(),
    collection: z.string(),
    countries: z.array(z.string()).default([]),
    descriptionEn: z.string().optional(),
    descriptionEs: z.string().optional(),
    descriptionIt: z.string().optional(),
    images: z.array(z.string()).default([]),
    videoUrl: z.string().url().nullable().optional(),
    available: z.boolean().default(true),
    featured: z.boolean().default(false),
    year: z.number().int().optional(),
  }),
});

export const collections = { figurines };
