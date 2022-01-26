import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SideTrayState = {
  user: string;
  role: string;
  userData: object;
};

const initialState: SideTrayState = {
  user: "",
  role: "admin",
  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action?.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action?.payload;
    },
    setUserData: (state, action: PayloadAction<object>) => {
      state.userData = action?.payload;
    },
  },
});

export const { setUser, setRole, setUserData } = userSlice?.actions;

export default userSlice?.reducer;
