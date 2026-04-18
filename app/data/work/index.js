// Aggregator: imports every project JSON and exposes a unified API.
// To add a new project: drop a JSON file under data/work/{category}/ and import it here.
import frontendProject from "./web-development/frontend-project.json";
import bahariSite from "./web-development/bahari-site.json"; // moved from ecommerce → web-development
import seoAlHadith from "./seo/al-hadith.json";
import seoDuaRuqyah from "./seo/dua-ruqyah.json";
import seoIrdFoundation from "./seo/ird-foundation.json";
import deepLearning from "./neural-networks/deep-learning.json";
import dataVisualization from "./data-visualization/data-visualization.json";

export const workMeta = {
  title: "My Latest Work",
  subtitle: "My Portfolio",
  content:
    "Explore my recent projects showcasing expertise in web development, SEO, and data analysis. Each project reflects my commitment to quality and innovation.",
  showMoreText: "Show More Projects",
  viewProjectText: "View Project",
  allLabel: "All",
};

export const workProjects = [
  frontendProject,
  bahariSite,
  seoAlHadith,
  seoDuaRuqyah,
  seoIrdFoundation,
  deepLearning,
  dataVisualization,
];

// Fixed category order for the filter tabs
export const workCategories = [
  "Web Development",
  "Search Engine Optimization",
  "Neural Networks Implementation",
  "Data Visualization",
];

const workData = {
  meta: workMeta,
  cards: workProjects,
  categories: workCategories,
  // Back-compat fields used by the existing Work component
  title: workMeta.title,
  subtitle: workMeta.subtitle,
  content: workMeta.content,
  showMoreText: workMeta.showMoreText,
  viewProjectText: workMeta.viewProjectText,
};

export default workData;
