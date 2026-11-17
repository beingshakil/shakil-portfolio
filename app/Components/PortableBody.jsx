"use client"
// Renders a blog post body (Sanity Portable Text) with the same look the old
// HTML-in-JSON content had: the .blog-rich styles in globals.css still apply.
import { PortableText, toPlainText } from '@portabletext/react';
import { urlFor } from '../../sanity/lib/image';

export function toId(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');
}

// Entries for the Table of Contents: every H2 plus every Key takeaways box.
export function getHeadings(body) {
  return (body || []).flatMap((b) => {
    if (b._type === 'block' && b.style === 'h2') {
      const title = toPlainText(b).trim();
      return title ? [{ id: toId(title), title }] : [];
    }
    if (b._type === 'keyTakeaways' && b.title?.trim()) {
      return [{ id: toId(b.title), title: b.title.trim() }];
    }
    return [];
  });
}

const isExternal = (href = '') => /^https?:\/\//i.test(href);

// Table cells are plain strings with two shortcuts: **bold** and [text](url).
const CELL_TOKEN = /(\*\*.+?\*\*|\[[^\]]+\]\([^)\s]+\))/g;
function renderCell(text = '') {
  return text.split(CELL_TOKEN).filter(Boolean).map((part, i) => {
    if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{renderCell(part.slice(2, -2))}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} {...(isExternal(link[2]) && { target: '_blank', rel: 'noopener noreferrer' })}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

const components = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children, value }) => (
      <h2
        id={toId(toPlainText(value))}
        className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-28 text-left"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="text-left">{children}</h3>,
    h4: ({ children }) => <h4 className="text-left">{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} {...(value?.blank && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const dims = value.dimensions;
      return (
        <figure className="my-8">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={urlFor(value).width(1400).fit('max').url()}
              alt={value.alt || ''}
              width={dims?.width}
              height={dims?.height}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    keyTakeaways: ({ value }) => (
      <div id={value.title ? toId(value.title) : undefined} className="my-8 scroll-mt-28 text-left">
        <div className="bg-primary/10 dark:bg-white/[0.06] rounded-2xl p-8">
          {value.title && (
            <h4 className="!text-xl !mt-0 !mb-5 font-bold text-gray-900 dark:text-white">{value.title}</h4>
          )}
          <PortableText value={value.content || []} components={components} onMissingComponent={false} />
        </div>
      </div>
    ),
    table: ({ value }) => {
      const rows = value?.rows || [];
      if (!rows.length) return null;
      const head = value.hasHeaderRow ? rows[0] : null;
      const bodyRows = value.hasHeaderRow ? rows.slice(1) : rows;
      return (
        <div className="blog-table-scroll text-left">
          <table>
            {head && (
              <thead>
                <tr>
                  {(head.cells || []).map((cell, i) => <th key={i}>{renderCell(cell)}</th>)}
                </tr>
              </thead>
            )}
            <tbody>
              {bodyRows.map((row, r) => (
                <tr key={row._key || r}>
                  {(row.cells || []).map((cell, i) => <td key={i}>{renderCell(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="text-left">
        <code>{value?.code}</code>
      </pre>
    ),
  },
};

export default function PortableBody({ value }) {
  return (
    <div className="blog-rich text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
      <PortableText value={value || []} components={components} onMissingComponent={false} />
    </div>
  );
}
