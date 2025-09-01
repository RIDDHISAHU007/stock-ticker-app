import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stockticker.vercel.app"

  return [
    {
      url: baseUrl,/*for home page*/
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/stock`,/*for stock page*/
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.8,
    },
  ]
}
