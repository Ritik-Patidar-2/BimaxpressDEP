import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type caseSliceState = {
  newCaseNum: string;
};

const initialState: caseSliceState = {
  newCaseNum: "",
};

export const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    setNewCaseNum: (state, action: PayloadAction<string>) => {
      state.newCaseNum = action?.payload;
    },
  },
});

export const { setNewCaseNum } = caseSlice?.actions;

export default caseSlice?.reducer;
