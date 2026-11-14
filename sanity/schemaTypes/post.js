import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'The H1 shown at the top of the post and on blog cards.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      description: 'The post lives at /blog/<slug>. Do not change it after publishing, or old links break.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      group: ['content', 'seo'],
      description: 'Shown under the title, on blog cards, and as the Google meta description. Aim for 140 to 160 characters.',
      validation: (Rule) => [
        Rule.required(),
        Rule.max(200).warning('Google usually cuts descriptions after about 160 characters.'),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'content',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'date',
      group: 'content',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
      initialValue: 'Md Shakil Hossen',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time (minutes)',
      type: 'number',
      group: 'content',
      description: 'Leave empty to calculate it from the text automatically.',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      description: 'The title Google shows. Leave empty to use the post title.',
      validation: (Rule) => Rule.max(70).warning('Google usually cuts titles after about 60 characters.'),
    }),
  ],
  orderings: [
    {
      title: 'Publish date, newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', category: 'category.title', date: 'publishedAt', media: 'coverImage' },
    prepare: ({ title, category, date, media }) => ({
      title,
      subtitle: [category, date].filter(Boolean).join(' · '),
      media,
    }),
  },
});
