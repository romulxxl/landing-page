import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://flowly.io", lastModified: new Date(), priority: 1 },
  ];
}
