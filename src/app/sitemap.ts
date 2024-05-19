import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = "https://app.tapped.ai";
  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
