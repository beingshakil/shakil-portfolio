// Aggregator: imports every blog post JSON and exposes a unified API.
// To add a new post: drop a JSON file under data/blog/{category}/ and import it here.
import seoTraffic from "./seo/how-i-increased-website-traffic-by-5x-using-seo.json";
import dataPandas from "./data-analysis/automating-data-workflows-with-python-pandas.json";
import dataPowerbi from "./data-visualization/building-interactive-dashboards-with-power-bi.json";

export const blogMeta = {
  title: "Blog & Insights",
  subtitle: "Explore",
  description:
    "Thoughts, tutorials, and insights on Data Analysis, SEO, and Web Development. Stay updated with the latest trends and techniques.",
  readMoreText: "Read More",
  backText: "Back to Blog",
  allLabel: "All",
};

export const blogPosts = [seoTraffic, dataPandas, dataPowerbi];

export const blogCategories = Array.from(
  new Set(blogPosts.map((p) => p.category))
);

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

const blogData = { meta: blogMeta, posts: blogPosts, categories: blogCategories };
export default blogData;
