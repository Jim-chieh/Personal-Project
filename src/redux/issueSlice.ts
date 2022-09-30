import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface CounterState {
	labels: string[];
	assignee: string;
	sort: string;
	filterText: string;
	state: string;
}

const initialState: CounterState = {
	labels: [],
	assignee: '',
	sort: 'created-desc',
	filterText: '',
	state: ''
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
		addSort: (state, action: PayloadAction<string>) => {
			state.sort = action.payload;
		},
		addFilter: (state, action: PayloadAction<string>) => {
			state.labels = [];
			state.assignee = '';
			state.sort = 'created-desc';
			state.filterText = action.payload;
		},
		addState: (state, action: PayloadAction<string>) => {
			state.state = action.payload;
		},
		clearAll: state => {
			state.labels = [];
			state.assignee = '';
			state.sort = 'created-desc';
			state.filterText = '';
		}
	}
});

export const {
	addLabel,
	clearLabel,
	removeLabel,
	addAssignee,
	clearAssignee,
	clearAll,
	addSort,
	addFilter,
	addState
} = issueListSlice.actions;

export default issueListSlice.reducer;
