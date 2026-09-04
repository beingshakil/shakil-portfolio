import { blogPosts } from '../data/blog/index';
import { absoluteUrl } from '../data/site';

// llms.txt is generated instead of shipped as a static file in /public so its
// links are built from the single site URL: a domain change updates them with
// no manual edit, and new blog posts appear here on their own.

const MAIN_PAGES = [
  { title: 'Home', path: '', summary: 'Portfolio overview covering services, expertise, and featured work' },
  { title: 'About', path: '/about', summary: 'Professional background, skills, tools, and personal profile' },
  { title: 'Experience', path: '/experience', summary: 'Work history, roles, and professional timeline' },
  { title: 'Services', path: '/services', summary: 'AI Automation, Technical SEO, Data Analysis, and Web Development services' },
  { title: 'My Work', path: '/work', summary: 'Portfolio of 50+ projects with real results and impact' },
  { title: 'Blog', path: '/explore', summary: 'Tutorials, case studies, and insights on SEO, Data, and AI' },
  { title: 'Contact', path: '/contact', summary: 'Hire or get in touch' },
];

// Section headings for the blog listing, in output order. Two data categories
// share one heading. Any category not listed here gets its own section at the
// end, so adding a category never silently drops its posts.
const BLOG_SECTIONS = [
  { title: 'Automation', categories: ['Automation'] },
  { title: 'SEO', categories: ['SEO'] },
  { title: 'Data Analysis and Visualization', categories: ['Data Analysis', 'Data Visualization'] },
  { title: 'Life', categories: ['Life'] },
];

// Short summaries written for LLM readers, keyed by slug. A post with no entry
// falls back to its own meta description.
const POST_SUMMARIES = {
  'gemini-vs-chatgpt-vs-claude':
    'Real-world comparison of Gemini, ChatGPT, and Claude for coding, automation, web scraping, and content writing',
  'ai-for-software-engineers':
    'How agentic AI, MCP, RAG, and prompt engineering are reshaping software development in 2026',
  'what-is-ai-automation':
    'How AI automation works, the key types, and how to implement it in your business',
  'what-is-seo-and-how-does-it-work':
    'Beginner-to-advanced guide covering crawling, indexing, ranking, the 3 pillars of SEO, and how to use AI for SEO',
  'best-seo-tools':
    'Honest verdict on 20+ tested tools for keyword research, technical audits, content, and link building',
  'automating-data-workflows-with-python-pandas':
    'Building automated ETL pipelines with Python, Pandas, and NumPy to cut manual processing time by over 60%',
  'building-interactive-dashboards-with-power-bi':
    'Designing clear, interactive dashboards that turn raw numbers into visual stories for non-technical stakeholders',
  'extra-curriculars':
    'The clubs, competitions, and community activities that shaped life outside academics and professional work',
  'sylhet-tour':
    'Travel diary from Sylhet covering the tea gardens of Sreemangal, Ratargul Swamp Forest, and Jaflong',
  'coxs-bazar-tour':
    "Travel diary from Cox's Bazar with sunsets over the Bay of Bengal and the world's longest natural sea beach",
};

function postSummary(post) {
  return POST_SUMMARIES[post.slug] || post.metadata?.description || '';
}

function linkLine(title, url, summary) {
  return summary ? `- [${title}](${url}): ${summary}` : `- [${title}](${url})`;
}

function blogSections() {
  const listed = new Set(BLOG_SECTIONS.flatMap((section) => section.categories));
  const extraCategories = Array.from(
    new Set(blogPosts.map((post) => post.category).filter((category) => !listed.has(category)))
  );

  return [
    ...BLOG_SECTIONS,
    ...extraCategories.map((category) => ({ title: category, categories: [category] })),
  ];
}

function buildLlmsTxt() {
  const lines = [
    '# Md Shakil Hossen',
    '',
    '> AI Automation and SEO Expert | Data Analyst | Bangladesh',
    '',
    'Md Shakil Hossen is a results-driven professional specializing in AI Automation, Technical SEO, Data Analysis, and Web Development based in Bangladesh. This portfolio showcases 50+ real-world projects, case studies, and expert insights across these domains.',
    '',
    '## Main Pages',
    '',
    ...MAIN_PAGES.map((page) => linkLine(page.title, absoluteUrl(page.path), page.summary)),
    '',
    '## Blog Posts',
  ];

  for (const section of blogSections()) {
    const posts = blogPosts.filter((post) => section.categories.includes(post.category));
    if (posts.length === 0) continue;

    lines.push('', `### ${section.title}`, '');
    for (const post of posts) {
      lines.push(linkLine(post.heading, absoluteUrl(`/blog/${post.slug}`), postSummary(post)));
    }
  }

  return `${lines.join('\n')}\n`;
}

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
