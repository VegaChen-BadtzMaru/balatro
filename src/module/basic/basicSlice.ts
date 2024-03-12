import { createSlice } from "@reduxjs/toolkit";
import { Poker } from "./type";
import { getBasicDeck } from "./func";

export interface basicState {
    basicDeck: Poker[];
}

const initialState: basicState = {
    basicDeck: getBasicDeck(),
};

export const basicSlice = createSlice({
    name: "basic",
    initialState,
    reducers: {},
});

export const basicReducer = basicSlice.reducer;
