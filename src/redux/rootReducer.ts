import { combineReducers } from "redux";
import utilityReducer from "./slices/utilitySlice";
import userReducer from "./slices/userSlice";
import doctorReducer from "./slices/doctorSlice";
import analystReducer from "./slices/analystSlice";
import hospitalReducer from "./slices/hospitalSlice";
import empanelledCompaniesReducer from "./slices/empanelledCompaniesSlice";
import planReducer from "./slices/planSlice";
import homeReducer from "./slices/homeSlice";
import mailSliceReducer from "./slices/mailSlice";
import caseReducer from "./slices/caseSlice";
import leftBarSlice from "./slices/leftBarSlice";

const rootReducer = combineReducers({
  utility: utilityReducer,
  user: userReducer,
  doctor: doctorReducer,
  analyst: analystReducer,
  hospital: hospitalReducer,
  empanelledCompanies: empanelledCompaniesReducer,
  plan: planReducer,
  home: homeReducer,
  mail: mailSliceReducer,
  case: caseReducer,
  leftBarSlice:leftBarSlice,
});

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
