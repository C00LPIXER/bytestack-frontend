export type ErrorResponse = {
  message?: string;
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};
