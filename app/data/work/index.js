// Aggregator: imports every project JSON and exposes a unified API.
// To add a new project: drop a JSON file under data/work/{category}/ and import it here.
import frontendProject from "./web-development/frontend-project.json";
import bahariSite from "./ecommerce/bahari-site.json";
import seoOptimization from "./seo/seo-optimization.json";
import deepLearning from "./neural-networks/deep-learning.json";

export const workMeta = {
  title: "My Latest Work",
  subtitle: "My Portfolio",
  content:
    "Explore my recent projects showcasing expertise in web development, SEO, and data analysis. Each project reflects my commitment to quality and innovation.",
  showMoreText: "Show More Projects",
  viewProjectText: "View Project",
  allLabel: "All",
};

export const workProjects = [frontendProject, bahariSite, seoOptimization, deepLearning];

export const workCategories = Array.from(
  new Set(workProjects.map((p) => p.category))
);

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
