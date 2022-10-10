import { configureStore } from '@reduxjs/toolkit';
import { createLabelApi } from './LabelCreateApi';
import issueListReducer from './issueSlice';
import loginReducer from './loginSlice';
import createIssueReducer from './createIssueSlice';

export const store = configureStore({
	reducer: {
		issueListReducer: issueListReducer,
		createIssueReducer: createIssueReducer,
		loginReducer: loginReducer,
		[createLabelApi.reducerPath]: createLabelApi.reducer
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat(createLabelApi.middleware);
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
