import { defineArrayMember, defineField, defineType } from 'sanity';

// Inline link used everywhere rich text appears.
const linkAnnotation = {
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
    }),
    defineField({
      name: 'blank',
      title: 'Open in a new tab',
      type: 'boolean',
      initialValue: true,
    }),
  ],
};

const inlineMarks = {
  decorators: [
    { title: 'Bold', value: 'strong' },
    { title: 'Italic', value: 'em' },
    { title: 'Code', value: 'code' },
  ],
  annotations: [linkAnnotation],
};

// Paragraphs and lists only: used inside the "Key takeaways" box.
export const simpleBlockContent = defineType({
  name: 'simpleBlockContent',
  title: 'Simple rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: inlineMarks,
    }),
  ],
});

// The post body.
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Section heading (H2, listed in Table of Contents)', value: 'h2' },
        { title: 'Subheading (H3)', value: 'h3' },
        { title: 'Small heading (H4)', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: inlineMarks,
    }),
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for screen readers and Google Images.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
    defineArrayMember({ type: 'keyTakeaways' }),
    defineArrayMember({ type: 'table' }),
    defineArrayMember({ type: 'codeBlock' }),
  ],
});
