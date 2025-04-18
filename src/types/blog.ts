export interface BlogPostData {
  title: string;
  content: string;
  metaDescription: string;
  tags: string[];
  topics: string[];
  isPremium: boolean;
  status: "draft" | "published" | "hidden";
  readTime: string;
  createdAt?: string;
}
