import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { User } from "../types/types";

const JWT_TOKEN = "jwtToken";

interface AuthState {
	user: User | null;
}
interface LoginAction {
	result: User;
	token: string;
}

const initialState: AuthState = {
	user: null,
};

// get or remove storage token
const token = localStorage.getItem(JWT_TOKEN);
if (token) {
	const decodeToken = jwtDecode<{ exp: number }>(token);
	if (decodeToken.exp * 1000 < Date.now()) {
		localStorage.removeItem(JWT_TOKEN);
	} else {
		initialState.user = jwtDecode<User>(token);
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
