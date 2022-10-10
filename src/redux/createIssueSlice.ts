import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface CounterState {
	labels: string[];
	assignee: string[];
	title: string;
	body: string;
}

const initialState: CounterState = {
	labels: [],
	assignee: [],
	title: '',
	body: ''
};

export const createIssueSlice = createSlice({
	name: 'createIssueReducer',
	initialState,
	reducers: {
		addLabel: (state, action: PayloadAction<string>) => {
			state.labels = [...state.labels, action.payload];
		},
		removeLabel: (state, action: PayloadAction<string[]>) => {
			state.labels = action.payload;
		},
		addAssignee: (state, action: PayloadAction<string>) => {
			state.assignee = [...state.assignee, action.payload];
		},
		removeAssignee: (state, action: PayloadAction<string[]>) => {
			state.assignee = action.payload;
		},
		clearAssignee: state => {
			state.assignee = [];
		},
		addTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		addBody: (state, action: PayloadAction<string>) => {
			state.body = action.payload;
		},
		clearAll: state => {
			state.labels = [];
			state.assignee = [];
			state.title = '';
			state.body = '';
		}
	}
});

export const {
	addLabel,
	addAssignee,
	removeLabel,
	removeAssignee,
	clearAssignee,
	addTitle,
	addBody,
	clearAll
} = createIssueSlice.actions;

export default createIssueSlice.reducer;
