import * as Yup from "yup";

const limit = Yup.number()
  .min(0, "value should be equal or greater than 0")
  .max(100, "value should be equal or less than 100")
  .required("field should not be empty");

export const inputSchema = Yup.object().shape({
  limit,
});
