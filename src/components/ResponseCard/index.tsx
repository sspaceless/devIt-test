import Card from "@mui/material/Card";
import { FC } from "react";

import { ResponseCardProps } from "./types";

export const ResponseCard: FC<ResponseCardProps> = ({ response }) => {
  const index =
    response.index && response.index >= 0 ? (
      <span>index: {response.index}</span>
    ) : undefined;

  return (
    <Card className="flex gap-2 p-2">
      <span>status: {response.status}</span>

      {index}

      <span>message: {response.message}</span>
    </Card>
  );
};
