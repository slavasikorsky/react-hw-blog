import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
	value: number;
	postPerPage: number;
}

const initialState: CounterState = {
	value: 0,
	postPerPage: 10,
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += state.postPerPage;
		},
		decrement: (state) => {
			state.value -= state.postPerPage;
		},
		goToPage: (state, action: PayloadAction<number>) => {
			state.value = action.payload * state.postPerPage;
		},
	},
});

export const { increment, decrement, goToPage } = counterSlice.actions;

export default counterSlice.reducer;
