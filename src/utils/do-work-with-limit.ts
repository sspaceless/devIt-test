import axios from "axios";
import pLimit from "p-limit";

export const doWorkWithLimit = async (limit: number) => {
  const limiter = pLimit(limit);

  const tasks = Array(...Array(1000)).map((value, index) =>
    limiter(() => axios.post("http://localhost:8080/api", { index })),
  );

  const result = await Promise.all(tasks);
  return result;
};
