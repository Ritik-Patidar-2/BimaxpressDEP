import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type empanelledCompaniesState = {
  empanelledCompaniesList: {};
  allCompaniesList: {};
};

const initialState: empanelledCompaniesState = {
  empanelledCompaniesList: {},
  allCompaniesList: {},
};

export const empanelledCompaniesSlice = createSlice({
  name: "empanelledCompanies",
  initialState,
  reducers: {
    setEmpanelledCompaniesListList: (state, action: PayloadAction<{}>) => {
      state.empanelledCompaniesList = action?.payload;
    },
    setAllCompaniesList: (state, action: PayloadAction<{}>) => {
      state.allCompaniesList = action?.payload;
    },
  },
});

export const { setEmpanelledCompaniesListList, setAllCompaniesList } =
  empanelledCompaniesSlice?.actions;

export default empanelledCompaniesSlice?.reducer;
