import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface CounterState {
	labels: string[];
	assignee: string;
	sort: string;
	filterText: string;
	state: string;
	per_page: string;
	page: string;
}

const initialState: CounterState = {
	labels: [],
	assignee: '',
	sort: 'created-desc',
	filterText: '',
	state: '',
	per_page: '&per_page=3',
	page: '&page=1'
};

export const issueListSlice = createSlice({
	name: 'issueListReducer',
	initialState,
	reducers: {
		addLabel: (state, action: PayloadAction<string>) => {
			state.labels = [...state.labels, action.payload];
			state.page = '';
		},
		removeLabel: (state, action: PayloadAction<string[]>) => {
			state.labels = action.payload;
			state.page = '';
		},
		clearLabel: state => {
			state.labels = [];
			state.page = '';
		},
		addAssignee: (state, action: PayloadAction<string>) => {
			state.assignee = action.payload;
			state.page = '';
		},
		clearAssignee: (state, action: PayloadAction<string>) => {
			state.assignee = action.payload;
			state.page = '';
		},
		addSort: (state, action: PayloadAction<string>) => {
			state.sort = action.payload;
			state.page = '';
		},
		addFilter: (state, action: PayloadAction<string>) => {
			state.labels = [];
			state.assignee = '';
			state.sort = 'created-desc';
			state.filterText = action.payload;
			state.page = '';
		},
		addState: (state, action: PayloadAction<string>) => {
			state.state = action.payload;
			state.page = '';
		},
		switchPerPage: (state, action: PayloadAction<string>) => {
			state.per_page = action.payload;
		},
		switchPage: (state, action: PayloadAction<string>) => {
			state.page = `&page=${action.payload}`;
		},
		clearAll: state => {
			state.labels = [];
			state.assignee = '';
			state.sort = 'created-desc';
			state.filterText = '';
			state.state = '';
			state.page = '';
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
	addState,
	switchPage,
	switchPerPage
} = issueListSlice.actions;

export default issueListSlice.reducer;
