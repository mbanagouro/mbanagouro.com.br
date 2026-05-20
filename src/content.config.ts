import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogPt = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog/pt' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog/en' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const eventSchema = z.object({
  date: z.coerce.date(),
  title: z.string(),
  subtitle: z.string().optional(),
  abstract: z.string().optional(),
  role: z.enum(['speaker', 'instructor', 'panelist']),
  city: z.string(),
  online: z.boolean().default(false),
  featured: z.boolean().default(false),
  url: z.string().optional(),
  resources: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
});

const eventsPt = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events/pt' }),
  schema: eventSchema,
});

const eventsEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events/en' }),
  schema: eventSchema,
});

export const collections = {
  'blog-pt': blogPt,
  'blog-en': blogEn,
  'events-pt': eventsPt,
  'events-en': eventsEn,
};
