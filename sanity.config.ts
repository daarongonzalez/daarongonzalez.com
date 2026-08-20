import { defineConfig, defineField, defineType } from 'sanity';
import { structureTool } from 'sanity/structure';
import type { StructureResolver } from 'sanity/structure';
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

const ctaPanelFields = defineType({
  name: 'ctaPanelContent',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'buttonLabel', type: 'string' }),
  ],
});

const reviewFields = defineType({
  name: 'reviewContent',
  title: 'Review',
  type: 'object',
  fields: [
    defineField({ name: 'lead', title: 'Lead quote (large, optional)', type: 'string' }),
    defineField({ name: 'body', type: 'text' }),
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
  ],
});

const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Content',
  type: 'document',
  groups: [
    { name: 'home', title: 'Home Page' },
    { name: 'about', title: 'About Page' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'home',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({
          name: 'lines',
          title: 'Headline lines',
          description: 'Each entry is its own line above the highlighted word.',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'goldWord', title: 'Highlighted word', type: 'string' }),
        defineField({ name: 'body', type: 'text' }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'home',
      of: [
        {
          type: 'object',
          name: 'serviceItem',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'homeAboutStrip',
      title: 'About Strip Copy',
      description: 'The short paragraph in the homepage About section.',
      type: 'text',
      group: 'home',
    }),
    defineField({
      name: 'aboutStats',
      title: 'About Stats',
      type: 'array',
      group: 'home',
      of: [
        {
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({ name: 'value', type: 'string' }),
            defineField({ name: 'label', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'homeSections',
      title: 'Section Headings',
      type: 'object',
      group: 'home',
      fields: [
        defineField({ name: 'workHeading', type: 'string' }),
        defineField({ name: 'workBlurb', type: 'text' }),
        defineField({ name: 'educationHeading', type: 'string' }),
        defineField({ name: 'educationBlurb', type: 'text' }),
        defineField({
          name: 'educationLogoLabel',
          title: 'Logo band label',
          description: 'Sits above the "taught with" logos.',
          type: 'string',
        }),
        defineField({ name: 'blogHeading', type: 'string' }),
        defineField({ name: 'blogBlurb', type: 'text' }),
      ],
    }),
    defineField({
      name: 'reviewSets',
      title: 'Reviews',
      type: 'array',
      group: 'home',
      of: [
        {
          type: 'object',
          name: 'reviewPair',
          fields: [
            defineField({ name: 'primary', type: 'reviewContent' }),
            defineField({ name: 'secondary', type: 'reviewContent' }),
          ],
          preview: {
            select: { title: 'primary.name', subtitle: 'secondary.name' },
          },
        },
      ],
    }),
    defineField({
      name: 'homeCta',
      title: 'Bottom CTA ("Ready to talk?")',
      type: 'ctaPanelContent',
      group: 'home',
    }),
    defineField({
      name: 'aboutIntro',
      title: 'Intro',
      type: 'object',
      group: 'about',
      fields: [
        defineField({ name: 'heading', type: 'string' }),
        defineField({ name: 'body', type: 'text' }),
      ],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline ("How I got here")',
      type: 'array',
      group: 'about',
      of: [
        {
          type: 'object',
          name: 'timelineItem',
          fields: [
            defineField({ name: 'number', type: 'string' }),
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
            defineField({ name: 'highlight', title: 'Highlight this step', type: 'boolean' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'approach',
      title: 'Approach ("How I work")',
      type: 'array',
      group: 'about',
      of: [
        {
          type: 'object',
          name: 'approachItem',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({ name: 'description', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'aboutCta',
      title: 'Bottom CTA ("Let\'s build something together")',
      type: 'ctaPanelContent',
      group: 'about',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Content' };
    },
  },
});

const singletonId = 'siteSettings';

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Content')
        .id(singletonId)
        .child(S.document().schemaType('siteSettings').documentId(singletonId)),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'siteSettings'),
    ]);

export default defineConfig({
  name: 'daarongonzalez',
  title: 'daarongonzalez.com',
  projectId: 'ylsopuoz',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: [post, event, ctaPanelFields, reviewFields, siteSettings],
    templates: (templates) => templates.filter((t) => t.schemaType !== 'siteSettings'),
  },
  document: {
    // Keep the singleton from being deleted or duplicated via the default document actions.
    actions: (input, context) =>
      context.schemaType === 'siteSettings'
        ? input.filter(({ action }) => action && !['delete', 'duplicate'].includes(action))
        : input,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? prev.filter((t) => t.templateId !== 'siteSettings') : prev,
  },
});
