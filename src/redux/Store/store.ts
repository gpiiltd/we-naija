import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/user/userSlice"; 
import instituteReducer from "../Services/institute/instituteSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    institute: instituteReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

