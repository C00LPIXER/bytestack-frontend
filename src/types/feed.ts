import { BlogPostData } from "./blog";
import { User } from "./user";

export type BloggerData = User & {
  isFollowed: boolean;
  followers: number;
  isFollower: boolean
};

export interface TopicData {
  name: string;
  articles: number;
  authors: number;
}

export type FeedItem = BlogPostData | BloggerData | TopicData;
export type FeedType = "blogs" | "bloggers" | "topics";
