import TextField from "@mui/material/TextField";
import { FC } from "react";

import { InputProps } from "./types";

export const Input: FC<InputProps> = ({
  errors,
  touched = false,
  ...props
}) => {
  const inputHasError = !!errors && errors.length > 0 && touched;
  return <TextField error={inputHasError} helperText={errors} {...props} />;
};
