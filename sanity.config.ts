import { defineConfig, defineField, defineType } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'seoDescription', type: 'text' }),
    defineField({
      name: 'featured',
      title: 'Feature on blog index',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
});

const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'startsAt', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'location', type: 'string', description: 'e.g. "Online" or a venue name' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'lumaUrl',
      title: 'Luma sign-up URL',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['upcoming', 'past'] },
      initialValue: 'upcoming',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'startsAt' },
  },
});

export default defineConfig({
  name: 'daarongonzalez',
  title: 'daarongonzalez.com',
  projectId: 'ylsopuoz',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [post, event],
  },
});
