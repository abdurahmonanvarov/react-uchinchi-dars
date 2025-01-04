import { createSlice, isPending } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authReady: false,
  isPending: false,
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
    setIsPending: (state, { payload }) => {
      state.isPending = payload;
    },
    // info: (state, { payload }) => {
    //   state.user = payload;
    // },
  },
});

export const { logOut, login, authReadyAct, setIsPending } = userSlice.actions;
export default userSlice.reducer;
