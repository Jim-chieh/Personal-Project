import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface CounterState {
	labels: string[];
	assignee: string;
}

const initialState: CounterState = {
	labels: [],
	assignee: ''
};

export const issueListSlice = createSlice({
	name: 'issueListReducer',
	initialState,
	reducers: {
		addLabel: (state, action: PayloadAction<string>) => {
			state.labels = [...state.labels, action.payload];
		},
		removeLabel: (state, action: PayloadAction<string[]>) => {
			state.labels = action.payload;
		},
		clearLabel: state => {
			state.labels = [];
		},
		addAssignee: (state, action: PayloadAction<string>) => {
			state.assignee = action.payload;
		},
		clearAssignee: (state, action: PayloadAction<string>) => {
			state.assignee = action.payload;
		},
		clearAll: state => {
			state.labels = [];
			state.assignee = '';
		}
	}
});

export const {
	addLabel,
	clearLabel,
	removeLabel,
	addAssignee,
	clearAssignee,
	clearAll
} = issueListSlice.actions;

export default issueListSlice.reducer;
