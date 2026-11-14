import { defineArrayMember, defineField, defineType } from 'sanity';

// Highlighted box with a heading and a short list, e.g. "Key takeaways".
export const keyTakeaways = defineType({
  name: 'keyTakeaways',
  title: 'Key takeaways box',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Key takeaways',
      description: 'Also listed in the Table of Contents.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'simpleBlockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'Key takeaways', subtitle: 'Key takeaways box' }),
  },
});

// Simple table. Cells are plain text with two shortcuts:
// **bold text** and [link text](https://example.com).
export const table = defineType({
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'hasHeaderRow',
      title: 'First row is the header',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      description: 'In any cell, write **bold** for bold text and [text](https://url) for a link.',
      of: [
        defineArrayMember({
          name: 'tableRow',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: { cells: 'cells' },
            prepare: ({ cells }) => ({ title: (cells || []).join('  |  ') || 'Empty row' }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { rows: 'rows' },
    prepare: ({ rows }) => ({
      title: (rows?.[0]?.cells || []).join('  |  ') || 'Table',
      subtitle: `Table, ${rows?.length || 0} rows`,
    }),
  },
});

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code block',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Optional, e.g. javascript, python, bash.',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { code: 'code', language: 'language' },
    prepare: ({ code, language }) => ({
      title: (code || '').split('\n')[0] || 'Code block',
      subtitle: language ? `Code (${language})` : 'Code',
    }),
  },
});
