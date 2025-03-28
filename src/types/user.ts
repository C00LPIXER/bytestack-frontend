export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  links: string[];
  isBlogger: boolean;
  isSubscribed: boolean;
  subType: string | null;
  subEndDate: string | null;
  trialEndDate: string | null;
  followedTopics: string[];
  techInterests: string[];
  searchHistory: string[];
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
}
