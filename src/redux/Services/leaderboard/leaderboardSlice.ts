import { createSlice } from "@reduxjs/toolkit";
import { triggerGetAllLeaderboardData } from "./LeaderboardService";
interface IinitialState {
  leaderboardData: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
}

const initialState: IinitialState = {
  leaderboardData: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    resetLeaderboardState: (state) => {
      state.leaderboardData.error = initialState.leaderboardData.error;
      state.leaderboardData.message = initialState.leaderboardData.message;
      state.leaderboardData.statusCode = initialState.leaderboardData.statusCode;
    },
  },
  extraReducers: (builder) => {
    //LIST ALL LEADERBOARD DATA
    builder.addCase(triggerGetAllLeaderboardData.pending, (state) => {
      state.leaderboardData.loading = true;
      state.leaderboardData.error = false;
      state.leaderboardData.data = {};
      state.leaderboardData.message = "";
    });
    builder.addCase(triggerGetAllLeaderboardData.fulfilled, (state, action) => {
      state.leaderboardData.loading = false;
      state.leaderboardData.data = action.payload?.data;
      state.leaderboardData.error = false;
      state.leaderboardData.message = action.payload?.message as unknown as string;
      state.leaderboardData.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerGetAllLeaderboardData.rejected, (state, action) => {
      state.leaderboardData.loading = false;
      state.leaderboardData.error = true;
      state.leaderboardData.message = action.payload?.message as unknown as string;
      state.leaderboardData.statusCode = action.payload?.status_code ?? null;
    });
  },
});

export const { resetLeaderboardState } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
