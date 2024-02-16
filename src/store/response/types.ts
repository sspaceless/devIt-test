export type Response = {
  index?: number;
  status: number;
  message: string;
};

export type State = {
  responseData: Response[];
};
