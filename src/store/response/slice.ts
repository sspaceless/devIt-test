import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Response, State } from "./types";

export const initialState: State = {
  responseData: [],
};

export const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    pushResponse(state, action: PayloadAction<Response>) {
      state.responseData.push(action.payload);
    },
  },
});

export const responseActions = responseSlice.actions;
