import { createSlice } from "@reduxjs/toolkit";
import { triggerGetAllInstitution, triggerGetAllSurveyCategories, triggerGetInstitutionById, triggerSurveyIndicatorById, triggerSurveyIndicatorQuestions } from "./instituteServices";
interface IinitialState {
  institution: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  institutionById: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };  
  surveyCategories: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  surveyIndicator: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
  surveyIndicatorQuestions: {
    data: Record<string, string>[] | any;
    loading: boolean;
    error: boolean;
    message: string | undefined;
    statusCode?: number | null;
  };
}

const initialState: IinitialState = {
  institution: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  institutionById: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  surveyCategories: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  surveyIndicator: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
  surveyIndicatorQuestions: {
    data: [],
    loading: false,
    error: false,
    message: "",
    statusCode: null,
  },
};



const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    resetInstitutionState: (state) => {
      state.institution.error = initialState.institution.error;
      state.institution.message = initialState.institution.message;
      state.institution.statusCode = initialState.institution.statusCode;
    },
    resetSurveyCategoriesState: (state) => {
      state.surveyCategories.error = initialState.surveyCategories.error;
      state.surveyCategories.message = initialState.surveyCategories.message;
      state.surveyCategories.statusCode = initialState.surveyCategories.statusCode;
    },
    resetSurveyIndicatorState: (state) => {
      state.surveyIndicator.error = initialState.surveyIndicator.error;
      state.surveyIndicator.message = initialState.surveyIndicator.message;
      state.surveyIndicator.statusCode = initialState.surveyIndicator.statusCode;
    },
    resetSurveyIndicatorQuestionsState: (state) => {
      state.surveyIndicatorQuestions.error = initialState.surveyIndicatorQuestions.error;
      state.surveyIndicatorQuestions.message = initialState.surveyIndicatorQuestions.message;
      state.surveyIndicatorQuestions.statusCode = initialState.surveyIndicatorQuestions.statusCode;
    },
  },
  extraReducers: (builder) => {
     //LIST ALL INSTITUTION
     builder.addCase(triggerGetAllInstitution.pending, (state) => {
      state.institution.loading = true;
      state.institution.error = false;
      state.institution.data = {};
      state.institution.message = "";
    });
    builder.addCase(
      triggerGetAllInstitution.fulfilled,
      (state, action) => {
        state.institution.loading = false;
        state.institution.data = action.payload?.results!;
        state.institution.error = false;
        state.institution.message = action.payload?.message as unknown as string;
        state.institution.statusCode = action.payload?.status_code as unknown as number;
      }
    );
    builder.addCase(
      triggerGetAllInstitution.rejected,
      (state, action) => {
        state.institution.loading = false;
        state.institution.error = true;
        state.institution.message = action.payload?.message as unknown as string;
        state.institution.statusCode = action.payload?.status_code ?? null;
      }
    );

    //LIST INSTITUTION BY ID
    builder.addCase(triggerGetInstitutionById.pending, (state) => {
      state.institutionById.loading = true;
      state.institutionById.error = false;
      state.institutionById.data = {};
      state.institutionById.message = "";
    });
    builder.addCase(triggerGetInstitutionById.fulfilled, (state, action) => {
      state.institutionById.loading = false;
      state.institutionById.data = action.payload;
      state.institutionById.error = false;
      state.institutionById.message = action.payload?.message as unknown as string;
      state.institutionById.statusCode = action.payload?.status_code as unknown as number;
    }); 
    builder.addCase(triggerGetInstitutionById.rejected, (state, action) => {
      state.institutionById.loading = false;
      state.institutionById.error = true;
      state.institutionById.message = action.payload?.message as unknown as string;
      state.institutionById.statusCode = action.payload?.status_code as unknown as number;
    });

    //LIST ALL ADMIN
    builder.addCase(triggerGetAllSurveyCategories.pending, (state) => {
      state.surveyCategories.loading = true;
      state.surveyCategories.error = false;
      state.surveyCategories.data = {};
      state.surveyCategories.message = "";
    });
    builder.addCase(triggerGetAllSurveyCategories.fulfilled, (state, action) => {
      state.surveyCategories.loading = false;
      state.surveyCategories.data = action.payload?.results;
      state.surveyCategories.error = false;
      state.surveyCategories.message = action.payload?.message as unknown as string;
      state.surveyCategories.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerGetAllSurveyCategories.rejected, (state, action) => {
      state.surveyCategories.loading = false;
      state.surveyCategories.error = true;
      state.surveyCategories.message = action.payload?.message as unknown as string;
      state.surveyCategories.statusCode = action.payload?.status_code as unknown as number;  
    });
    builder.addCase(triggerSurveyIndicatorById.pending, (state) => {
      state.surveyIndicator.loading = true;
      state.surveyIndicator.error = false;
      state.surveyIndicator.data = {};
      state.surveyIndicator.message = "";
    });
    builder.addCase(triggerSurveyIndicatorById.fulfilled, (state, action) => {
      state.surveyIndicator.loading = false;
      state.surveyIndicator.data = action.payload;
      state.surveyIndicator.error = false;
      state.surveyIndicator.message = action.payload?.message as unknown as string;
      state.surveyIndicator.statusCode = action.payload?.status_code as unknown as number;  
    });
    builder.addCase(triggerSurveyIndicatorById.rejected, (state, action) => {
      state.surveyIndicator.loading = false;
      state.surveyIndicator.error = true;
      state.surveyIndicator.message = action.payload?.message as unknown as string;
      state.surveyIndicator.statusCode = action.payload?.status_code as unknown as number;    
    });
    builder.addCase(triggerSurveyIndicatorQuestions.pending, (state) => {
      state.surveyIndicatorQuestions.loading = true;
      state.surveyIndicatorQuestions.error = false;
      state.surveyIndicatorQuestions.data = {};
      state.surveyIndicatorQuestions.message = "";
    });
    builder.addCase(triggerSurveyIndicatorQuestions.fulfilled, (state, action) => {
      state.surveyIndicatorQuestions.loading = false;
      state.surveyIndicatorQuestions.data = action.payload.results;
      state.surveyIndicatorQuestions.error = false;
      state.surveyIndicatorQuestions.message = action.payload?.message as unknown as string;
      state.surveyIndicatorQuestions.statusCode = action.payload?.status_code as unknown as number;
    });
    builder.addCase(triggerSurveyIndicatorQuestions.rejected, (state, action) => {
      state.surveyIndicatorQuestions.loading = false;
      state.surveyIndicatorQuestions.error = true;
      state.surveyIndicatorQuestions.message = action.payload?.message as unknown as string;
      state.surveyIndicatorQuestions.statusCode = action.payload?.status_code as unknown as number;
    }); 
  },
});

export const { resetInstitutionState, resetSurveyCategoriesState, resetSurveyIndicatorState } = instituteSlice.actions;

export default instituteSlice.reducer;
