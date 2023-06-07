import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { darkTheme, lightTheme } from "../data/theme";

type ThemeType = {
	mode: string;
	PRIMARY_BG_COLOR: string;
	PRIMARY_TEXT_COLOR: string;
};

export interface ThemeState {
	value: ThemeType;
}

const initialState: ThemeState = {
	value: darkTheme,
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<string>) => {
			switch (action.payload) {
				case "light":
					state.value = lightTheme;
					break;
				case "dark":
					state.value = darkTheme;
					break;
				default:
					state.value = darkTheme;
					break;
			}
		},
	},
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
