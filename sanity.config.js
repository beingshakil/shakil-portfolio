'use client';

// Sanity Studio, served by this Next.js app at /studio
// (see app/studio/[[...tool]]/page.jsx).
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Md Shakil Hossen',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('post').title('Blog Posts'),
            S.documentTypeListItem('category').title('Categories'),
          ]),
    }),
  ],
});
