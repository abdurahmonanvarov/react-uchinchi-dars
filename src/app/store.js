import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../app/featcher/userSlice";

export const store = configureStore({
  reducer: {
    user: useReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["user.user"], // Ignore specific paths
        ignoredActions: ["user/login"], // Ignore specific actions
      },
    }),
});
