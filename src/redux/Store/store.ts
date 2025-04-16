import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/user/userSlice"; 
import instituteReducer from "../Services/institute/instituteSlice";
import communityReducer from "../Services/community/communitySlice";
import leaderboardReducer from "../Services/leaderboard/leaderboardSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    institute: instituteReducer,
    community: communityReducer,
    leaderboard: leaderboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

