export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  headline?: string;
  slug: string;
  bio?: string;
  links: string[];
  isBlogger: boolean;
  isSubscribed: boolean;
  subType: "trial" | "monthly" | "yearly" | null;
  subEndDate: Date | null;
  trialEndDate: Date | null;
  followedTopics: string[];
  techInterests: string[];
  searchHistory: string[];
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isBanned: boolean;
}
