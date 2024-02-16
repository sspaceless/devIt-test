import { TextFieldProps } from "@mui/material";

export type InputProps = TextFieldProps & {
  touched?: boolean;
  errors?: string;
};
