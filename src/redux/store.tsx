import { configureStore } from '@reduxjs/toolkit';
import { createLabelApi } from './LabelCreateApi';
import issueListReducer from './issueSlice';

export const store = configureStore({
	reducer: {
		issueListReducer: issueListReducer,
		[createLabelApi.reducerPath]: createLabelApi.reducer
	},
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware().concat(createLabelApi.middleware);
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
