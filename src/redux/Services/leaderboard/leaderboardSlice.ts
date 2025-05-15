import { createSlice } from "@reduxjs/toolkit";
import {
  triggerGetAllLeaderboardData,
  triggerGetAllLeaderboardDataPublic,
} from "./LeaderboardService";
interface IinitialState {
  leaderboardData: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };

  leaderboardDataPublic: {
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
  leaderboardDataPublic: {
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
      state.leaderboardData.statusCode =
        initialState.leaderboardData.statusCode;
    },
    resetLeaderboardPublicState: (state) => {
      state.leaderboardDataPublic.error = initialState.leaderboardData.error;
      state.leaderboardDataPublic.message =
        initialState.leaderboardData.message;
      state.leaderboardDataPublic.statusCode =
        initialState.leaderboardDataPublic.statusCode;
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
      state.leaderboardData.message = action.payload
        ?.message as unknown as string;
      state.leaderboardData.statusCode = action.payload
        ?.status_code as unknown as number;
    });
    builder.addCase(triggerGetAllLeaderboardData.rejected, (state, action) => {
      state.leaderboardData.loading = false;
      state.leaderboardData.error = true;
      state.leaderboardData.message = action.payload
        ?.message as unknown as string;
      state.leaderboardData.statusCode = action.payload?.status_code ?? null;
    });

    //LIST ALL LEADERBOARD PUBLIC DATA
    builder.addCase(triggerGetAllLeaderboardDataPublic.pending, (state) => {
      state.leaderboardDataPublic.loading = true;
      state.leaderboardDataPublic.error = false;
      state.leaderboardDataPublic.data = {};
      state.leaderboardDataPublic.message = "";
    });
    builder.addCase(
      triggerGetAllLeaderboardDataPublic.fulfilled,
      (state, action) => {
        state.leaderboardDataPublic.loading = false;
        state.leaderboardDataPublic.data = action.payload?.data;
        state.leaderboardDataPublic.error = false;
        state.leaderboardDataPublic.message = action.payload
          ?.message as unknown as string;
        state.leaderboardDataPublic.statusCode = action.payload
          ?.status_code as unknown as number;
      },
    );
    builder.addCase(
      triggerGetAllLeaderboardDataPublic.rejected,
      (state, action) => {
        state.leaderboardDataPublic.loading = false;
        state.leaderboardDataPublic.error = true;
        state.leaderboardDataPublic.message = action.payload
          ?.message as unknown as string;
        state.leaderboardDataPublic.statusCode =
          action.payload?.status_code ?? null;
      },
    );
  },
});

export const { resetLeaderboardState } = leaderboardSlice.actions;
export const { resetLeaderboardPublicState } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
