import { defineArrayMember, defineConfig, defineField, defineType } from 'sanity';
import { structureTool } from 'sanity/structure';
import type { StructureResolver } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { CaseIcon } from '@sanity/icons/Case';
import { PresentationIcon } from '@sanity/icons/Presentation';
import { ImageIcon } from '@sanity/icons/Image';

/** Shared by all three Work types: lower numbers show first in the Work feed. */
const sortOrderField = defineField({
  name: 'sortOrder',
  type: 'number',
  description: 'Lower numbers show first. Leave gaps (10, 20, 30…) so new items can slot in between.',
  initialValue: 100,
});

const featuredField = defineField({
  name: 'featured',
  title: 'Show on homepage',
  description: 'Featured items appear in the homepage Work row. Everything shows on /work.',
  type: 'boolean',
  initialValue: false,
});

const imageWithAlt = (name: string, title?: string, required = false) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative Text',
        type: 'string',
        description: 'Describe the image for screen readers.',
      }),
    ],
    validation: required ? (r) => r.required() : undefined,
  });

const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  groups: [
    { name: 'card', title: 'Card', default: true },
    { name: 'caseStudy', title: 'Case Study' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'card', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'card',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortDescription',
      description: 'One or two sentences for the Work card.',
      type: 'text',
      rows: 2,
      group: 'card',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      group: 'card',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectTag',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'tone',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue', value: 'blue' },
                  { title: 'Gold', value: 'sun' },
                ],
                layout: 'radio',
              },
              initialValue: 'blue',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'tone' } },
        }),
      ],
    }),
    { ...imageWithAlt('thumbnail', 'Card image'), group: 'card' },
    { ...featuredField, group: 'card' },
    { ...sortOrderField, group: 'card' },
    defineField({
      name: 'caseStudy',
      type: 'object',
      group: 'caseStudy',
      description: 'Optional. Without it, the project page shows the card details only.',
      fields: [
        defineField({ name: 'description', type: 'text', rows: 3 }),
        imageWithAlt('heroImage'),
        defineField({ name: 'problemLabel', type: 'string', initialValue: 'The Problem' }),
        defineField({ name: 'problem', type: 'text', rows: 3 }),
        defineField({ name: 'solutionLabel', type: 'string', initialValue: 'The Solution' }),
        defineField({ name: 'solution', type: 'text', rows: 3 }),
        defineField({
          name: 'gallery',
          title: 'Process & screens',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'galleryItem',
              fields: [
                defineField({
                  name: 'label',
                  type: 'string',
                  description: 'Caption, also used as a placeholder when there is no image yet.',
                  validation: (r) => r.required(),
                }),
                defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
              ],
              preview: { select: { title: 'label', media: 'image' } },
            }),
          ],
        }),
        defineField({
          name: 'results',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'resultStat',
              fields: [
                defineField({ name: 'value', type: 'string', description: 'e.g. "92%"' }),
                defineField({ name: 'label', type: 'string' }),
              ],
              preview: { select: { title: 'value', subtitle: 'label' } },
            }),
          ],
        }),
      ],
    }),
  ],
  orderings: [{ title: 'Sort order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'shortDescription', media: 'thumbnail' } },
});

const workshop = defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  icon: PresentationIcon,
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'eyebrow',
      title: 'Host or series line',
      description: 'Short line above the title, e.g. "Stack · Live workshop" or "Skill #1 · Jan 10, 2025".',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    imageWithAlt('thumbnail', 'Session thumbnail'),
    defineField({
      name: 'url',
      title: 'Link',
      description: 'Recording, sign-up or recap page. Without one, the card is not clickable.',
      type: 'url',
    }),
    featuredField,
    sortOrderField,
  ],
  orderings: [{ title: 'Sort order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'eyebrow', media: 'thumbnail' } },
});

const sessionPhoto = defineType({
  name: 'sessionPhoto',
  title: 'Session Photo',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'caption',
      type: 'string',
      description: 'Shown over the bottom of the photo.',
      validation: (r) => r.required(),
    }),
    imageWithAlt('photo', undefined, true),
    featuredField,
    sortOrderField,
  ],
  orderings: [{ title: 'Sort order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  preview: { select: { title: 'caption', media: 'photo' } },
});

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
const workTypes = ['project', 'workshop', 'sessionPhoto'];

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Content')
        .id(singletonId)
        .child(S.document().schemaType('siteSettings').documentId(singletonId)),
      S.divider(),
      S.listItem()
        .title('Work')
        .icon(CaseIcon)
        .child(
          S.list()
            .title('Work')
            .items(workTypes.map((type) => S.documentTypeListItem(type))),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'siteSettings' && !workTypes.includes(item.getId() ?? ''),
      ),
    ]);

export default defineConfig({
  name: 'daarongonzalez',
  title: 'daarongonzalez.com',
  projectId: 'ylsopuoz',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: [post, event, project, workshop, sessionPhoto, ctaPanelFields, reviewFields, siteSettings],
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
