import { createSlice } from "@reduxjs/toolkit";
import {
  triggerGetAllCommunityCategories,
  triggerGetAllIndicators,
  triggerGetCommunityTaskCategoryById,
  triggerAnswerTaskQuestion,
} from "./communityServices";
interface IinitialState {
  communityCategories: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  communityTaskCategoryById: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  communityIndicators: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  answerTaskQuestion: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };  
}

const initialState: IinitialState = {
  communityCategories: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  communityTaskCategoryById: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  communityIndicators: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  answerTaskQuestion: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    resetCommunityState: (state) => {
      state.communityCategories.error = initialState.communityCategories.error;
      state.communityCategories.message = initialState.communityCategories.message;
      state.communityCategories.statusCode = initialState.communityCategories.statusCode;
    },
    resetCommunityIndicatorsState: (state) => {
      state.communityIndicators.error = initialState.communityIndicators.error;
      state.communityIndicators.message =
        initialState.communityIndicators.message;
      state.communityIndicators.statusCode =
        initialState.communityIndicators.statusCode;
    },
    resetCommunityTaskCategoryByIdState: (state) => {
      state.communityTaskCategoryById.error = initialState.communityTaskCategoryById.error;
      state.communityTaskCategoryById.message = initialState.communityTaskCategoryById.message;
      state.communityTaskCategoryById.statusCode =
        initialState.communityTaskCategoryById.statusCode;
    },
    resetAnswerTaskQuestionState: (state) => {
      state.answerTaskQuestion.error = initialState.answerTaskQuestion.error;
      state.answerTaskQuestion.message = initialState.answerTaskQuestion.message;
      state.answerTaskQuestion.statusCode = initialState.answerTaskQuestion.statusCode;
    },
  },
  extraReducers: (builder) => {
    //LIST ALL COMMUNITY TASKS
    builder.addCase(triggerGetAllCommunityCategories.pending, (state) => {
      state.communityCategories.loading = true;
      state.communityCategories.error = false;
      state.communityCategories.data = {};
      state.communityCategories.message = "";
    });
    builder.addCase(
      triggerGetAllCommunityCategories.fulfilled,
      (state, action) => {
        // console.log("action.payload>>>", action.payload);
        state.communityCategories.loading = false;
        state.communityCategories.data = action.payload?.results;
        state.communityCategories.error = false;
        state.communityCategories.message = action.payload?.message as unknown as string;
        state.communityCategories.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
      triggerGetAllCommunityCategories.rejected,
      (state, action) => {
        state.communityCategories.loading = false;
        state.communityCategories.error = true;
        state.communityCategories.message = action.payload?.message as unknown as string;
        state.communityCategories.statusCode = action.payload?.status_code ?? null;
      }
    );

    //LIST COMMUNITY TASK CATEGORY BY ID
    builder.addCase(triggerGetCommunityTaskCategoryById.pending, (state) => {
      state.communityTaskCategoryById.loading = true;
      state.communityTaskCategoryById.error = false;
      state.communityTaskCategoryById.data = {};
      state.communityTaskCategoryById.message = "";
    });
    builder.addCase(triggerGetCommunityTaskCategoryById.fulfilled, (state, action) => {
      console.log("ACTION PAYLOAD in COMMUNITY TASK CATEGORY BY ID>>>", action.payload);
      state.communityTaskCategoryById.loading = false;
      state.communityTaskCategoryById.data = action.payload;
      state.communityTaskCategoryById.error = false;
      state.communityTaskCategoryById.message = action.payload
        ?.message as unknown as string;
      state.communityTaskCategoryById.statusCode = action.payload
        ?.status_code as unknown as number;
    });
    builder.addCase(triggerGetCommunityTaskCategoryById.rejected, (state, action) => {
      state.communityTaskCategoryById.loading = false;
      state.communityTaskCategoryById.error = true;
      state.communityTaskCategoryById.message = action.payload
        ?.message as unknown as string;
      state.communityTaskCategoryById.statusCode = action.payload
        ?.status_code as unknown as number;
    });

    //LIST ALL INDICATORS
    builder.addCase(triggerGetAllIndicators.pending, (state) => {
      state.communityIndicators.loading = true;
      state.communityIndicators.error = false;
      state.communityIndicators.data = {};
      state.communityIndicators.message = "";
    });
    builder.addCase(triggerGetAllIndicators.fulfilled, (state, action) => {
      // console.log("ACTION PAYLOAD in INDICATORS>>>", action.payload);
      state.communityIndicators.loading = false;
      state.communityIndicators.data = action.payload?.results;
      state.communityIndicators.error = false;
      state.communityIndicators.message = action.payload
        ?.message as unknown as string;
      state.communityIndicators.statusCode = action.payload
        ?.status_code as unknown as number;
    });
    builder.addCase(triggerGetAllIndicators.rejected, (state, action) => {
      state.communityIndicators.loading = false;
      state.communityIndicators.error = true;
      state.communityIndicators.message = action.payload
        ?.message as unknown as string;
      state.communityIndicators.statusCode = action.payload
        ?.status_code as unknown as number;
    });

    //ANSWER TASK QUESTION
    builder.addCase(triggerAnswerTaskQuestion.pending, (state) => {
      state.answerTaskQuestion.loading = true;
      state.answerTaskQuestion.error = false;
      state.answerTaskQuestion.data = {};
      state.answerTaskQuestion.message = "";  
    });
    builder.addCase(triggerAnswerTaskQuestion.fulfilled, (state, action) => {
      state.answerTaskQuestion.loading = false;
      state.answerTaskQuestion.data = action.payload;
      state.answerTaskQuestion.error = false;
      state.answerTaskQuestion.message = action.payload
        ?.message as unknown as string;
      state.answerTaskQuestion.statusCode = action.payload
        ?.status_code as unknown as number;
    });
    builder.addCase(triggerAnswerTaskQuestion.rejected, (state, action) => {
      console.log("REJECTED ACTION PAYLOAD in ANSWER TASK QUESTION>>>", action.payload);
      state.answerTaskQuestion.loading = false;
      state.answerTaskQuestion.error = true;
      state.answerTaskQuestion.message = action.payload?.message as unknown as string;
      state.answerTaskQuestion.statusCode = action.payload?.status_code as unknown as number;
    }); 
  },
});

export const {
  resetCommunityState,
  resetCommunityIndicatorsState,
  resetCommunityTaskCategoryByIdState,
  resetAnswerTaskQuestionState,
} = communitySlice.actions;

export default communitySlice.reducer;
