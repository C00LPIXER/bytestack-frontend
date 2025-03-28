export interface LoginResponse {
    message: string;
    success: boolean;
    admin?: { id: string; email: string };
  }
  
  export interface RefreshTokenResponse {
    status: number;
    message: string;
    success: boolean;
  }
  
  // export interface AnalyticsResponse {
  //   status: number;
  //   message: string;
  //   success: boolean;
  //   analytics: {
  //     totalUsers: number;
  //     activeUsers: number;
  //     bannedUsers: number;
  //     adminUsers: number;
  //   };
  // }