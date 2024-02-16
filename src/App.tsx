import { Button, Card } from "@mui/material";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

import { ResponseCard } from "./components/ResponseCard";
import { Input } from "./components/UI";
import { useAppSelector } from "./hooks/use-app-selector";
import { inputSchema } from "./schemas";
import { responseActions } from "./store/response/slice";
import { Response } from "./store/response/types";
import { FormValues } from "./types";
import { doWorkWithLimit } from "./utils";

const App: FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const { responseData } = useAppSelector((state) => state.responses);
  const dispatch = useDispatch();

  const handleResponse = (response: Response) => {
    dispatch(responseActions.pushResponse(response));
  };

  const formik = useFormik<FormValues>({
    initialValues: { limit: 0 },
    validationSchema: inputSchema,
    onSubmit: async ({ limit }) => {
      console.log("submit");
      setIsStarted(true);

      await doWorkWithLimit(limit, handleResponse);

      setIsStarted(false);
    },
  });

  const handleStartButtonClick = () => {
    formik.submitForm();
  };

  return (
    <div className="flex w-full flex-col items-center p-4">
      <Card className="flex w-full flex-col gap-2 p-2 sm:w-1/2 sm:max-w-[600px]">
        <Input
          id="limit"
          label="limit"
          variant="outlined"
          placeholder="enter the limit"
          type="number"
          InputProps={{ inputProps: { min: "0", max: "100" } }}
          disabled={isStarted}
          defaultValue={formik.initialValues.limit}
          touched={formik.touched.limit}
          errors={formik.errors.limit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className="self-center">
          <Button variant="outlined" onClick={handleStartButtonClick}>
            start
          </Button>
        </div>
      </Card>

      <div className="mt-4 flex flex-col gap-4 overflow-auto p-2">
        {responseData.map((response) => {
          return <ResponseCard key={response.index} response={response} />;
        })}
      </div>
    </div>
  );
};

export default App;
