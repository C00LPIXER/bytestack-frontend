export interface BlogPostData {
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