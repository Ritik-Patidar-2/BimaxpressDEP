import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type planSliceState = {
  currentPlan: {};
  allPlans: {};
};

const initialState: planSliceState = {
  currentPlan: {},
  allPlans: {},
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setCurrentPlan: (state, action: PayloadAction<{}>) => {
      state.currentPlan = action?.payload;
    },
    setAllPlans: (state, action: PayloadAction<{}>) => {
      state.allPlans = action?.payload;
    },
  },
});

export const { setCurrentPlan, setAllPlans } = planSlice?.actions;

export default planSlice?.reducer;
