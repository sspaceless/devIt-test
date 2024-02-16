import axios, { AxiosError } from "axios";
import pLimit from "p-limit";

import { Response } from "../store/response/types";

export const doWorkWithLimit = async (
  limit: number,
  onResponse: (response: Response) => void,
) => {
  if (limit === 0) {
    return;
  }

  const limiter = pLimit(limit);

  const tasks = Array(...Array(100)).map((value, index) =>
    limiter(() =>
      axios.post<{ index: number }>("http://localhost:8080/api", { index }),
    ),
  );

  // Promise.allSettled(tasks).then((results) => console.log(results));

  tasks.forEach((promise) => {
    promise
      .then((result) => {
        const response = {
          index: +result.data.index,
          status: result.status,
          message: result.statusText,
        };
        onResponse(response);
      })
      .catch((error) => {
        const axiosError = error as AxiosError<{ message: string }>;

        const errorStatusCode =
          axiosError.response?.status ?? "unexpected status";
        const errorMessage =
          axiosError.response?.statusText ?? "something went wrong";

        const response = {
          index: undefined,
          status: +errorStatusCode,
          message: errorMessage,
        };

        console.log(error);

        onResponse(response);
      });
  });
};
