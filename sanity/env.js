// Sanity connection settings. The project ID and dataset are public values
// (they appear in every request the browser makes), so NEXT_PUBLIC_ is fine.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9jm8nwal';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Pinning the API version keeps query behavior stable when Sanity ships changes.
export const apiVersion = '2025-01-01';
