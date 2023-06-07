import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const LOGIN = "LOGIN";
const JWT_TOKEN = "jwtToken";
interface User {
	fullName: string;
	email: string;
	_id: number;
	iat: number;
	exp: number;
}
interface AuthState {
	user: User | null;
}
interface LoginAction {
	type: typeof LOGIN;
	result: User;
	token: string;
}

const initialState: AuthState = {
	user: null,
};

// get or remove storage token
if (localStorage.getItem(JWT_TOKEN)) {
	const decodeToken = jwtDecode<{ exp: number }>(
		localStorage.getItem(JWT_TOKEN)!
	);
	if (decodeToken.exp * 1000 < Date.now()) {
		localStorage.removeItem(JWT_TOKEN);
	} else {
		initialState.user = jwtDecode<User>(localStorage.getItem(JWT_TOKEN)!);
	}
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state: AuthState, action: PayloadAction<LoginAction>) => {
			localStorage.setItem(JWT_TOKEN, action.payload.token);
			state.user = action.payload.result;
		},
		logout: (state: AuthState) => {
			localStorage.removeItem(JWT_TOKEN);
			state.user = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
