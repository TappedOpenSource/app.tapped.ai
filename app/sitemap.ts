import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const host = 'https://tapped.ai';
  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${host}/download`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${host}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
