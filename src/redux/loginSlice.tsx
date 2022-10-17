import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface CounterState {
	token: string;
	loginUser: string;
	userAvatar: string;
}

const initialState: CounterState = {
	token: '',
	loginUser: '',
	userAvatar: ''
};

export const loginSlice = createSlice({
	name: 'loginReducer',
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
		},
		addAvatar: (state, action: PayloadAction<string>) => {
			state.userAvatar = action.payload;
		},
		deleteAvatar: state => {
			state.userAvatar = '';
		}
	}
});

export const {
	addToken,
	deleteToken,
	addLoginUser,
	deleteLoginUser,
	addAvatar,
	deleteAvatar
} = loginSlice.actions;

export default loginSlice.reducer;
