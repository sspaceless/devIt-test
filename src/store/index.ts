import { configureStore } from "@reduxjs/toolkit";

import { responseSlice } from "./response/slice";

const reducer = {
  responses: responseSlice.reducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
