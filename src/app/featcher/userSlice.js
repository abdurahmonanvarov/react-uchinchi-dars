import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logOut: (state, { payload }) => {
      state.user = payload;
    },
    authReadyAct: (state) => {
      state.authReady = true;
    },
    // info: (state, { payload }) => {
    //   state.user = payload;
    // },
  },
});

export const { logOut, login, authReadyAct } = userSlice.actions;
export default userSlice.reducer;
