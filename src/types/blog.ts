export interface BlogPost {
    id: string;
    author: {
      name: string;
      role: string;
      avatar: string;
    };
    title: string;
    description: string;
    publishedDate: string;
    readTime: string;
    likes: number;
    comments: number;
    bookmarks: number;
  }

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
    slug?: string;
  }
  