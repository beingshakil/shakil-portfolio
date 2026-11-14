"use client"
// Homepage blog teaser: the three latest posts. The full list with category
// filters lives at /explore.
import SectionHeading, { Section } from './SectionHeading';
import PostCard from './PostCard';

const HomeBlog = ({ content, posts = [] }) => (
  <Section id="blog" tone="white">
    <SectionHeading
      eyebrow={content.eyebrow}
      heading={content.heading}
      description={content.description}
      action={{ href: '/explore', label: content.actionText }}
    />

    <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-3">
      {posts.slice(0, 3).map((post) => (
        <PostCard key={post.slug} post={post} readMoreText={content.readMoreText} />
      ))}
    </div>
  </Section>
);

export default HomeBlog;
