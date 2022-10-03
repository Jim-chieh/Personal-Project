import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface CounterState {
	token: string;
	loginUser: string;
}

const initialState: CounterState = {
	token: '',
	loginUser: ''
};

export const loginSlice = createSlice({
	name: 'issueListReducer',
	initialState,
	reducers: {
		addToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		deleteToken: state => {
			state.token = '';
		},
		addLoginUser: (state, action: PayloadAction<string>) => {
			state.loginUser = action.payload;
		},
		deleteLoginUser: state => {
			state.loginUser = '';
		}
	}
});

export const { addToken, deleteToken, addLoginUser, deleteLoginUser } =
	loginSlice.actions;

export default loginSlice.reducer;
